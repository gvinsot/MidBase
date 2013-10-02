var TypeScriptTools;
(function (TypeScriptTools) {
    var BindingGlobalContext = (function () {
        function BindingGlobalContext() {
            this.BindingDictionary = new Object();
            this.CurrentBindingId = 0;
        }
        BindingGlobalContext.prototype.AddBinding = function (bindedObject, path, node) {
            if(bindedObject["BindingId"] == undefined) {
                this.CurrentBindingId++;
                bindedObject["BindingId"] = this.CurrentBindingId.toString();
            }
            var bindingObjectId = bindedObject["BindingId"];
            if(this.BindingDictionary[bindingObjectId] == undefined) {
                this.BindingDictionary[bindingObjectId] = new Object();
            }
            var bindingDictionarySubStructure = this.BindingDictionary[bindingObjectId];
            var binding = {
                Path: path,
                Node: node,
                BindedObject: bindedObject
            };
            if(bindingDictionarySubStructure[path] == undefined) {
                bindingDictionarySubStructure[path] = new Array();
            }
            bindingDictionarySubStructure[path].append(binding);
        };
        BindingGlobalContext.prototype.RemoveBinding = function (bindedObject, path, node) {
        };
        BindingGlobalContext.prototype.RemoveObjectBindings = function (bindedObject, path, node) {
        };
        BindingGlobalContext.prototype.RemoveNodeBindings = function (bindedObject, path, node) {
        };
        BindingGlobalContext.prototype.RaisePropertyChanged = function (changedObject, changedPath) {
        };
        return BindingGlobalContext;
    })();
    TypeScriptTools.BindingGlobalContext = BindingGlobalContext;    
    var BindingTools = (function () {
        function BindingTools() { }
        BindingTools.Bindings = new BindingGlobalContext();
        BindingTools.prototype.ApplyBinding = function (rootNode) {
            if(rootNode.attributes["data-binding"] != undefined) {
                TypeScriptTools.BindingTools.EvaluateBinding(rootNode.attributes["data-binding"]["nodeValue"], rootNode, false);
            }
        };
        BindingTools.prototype.ApplyTemplate = function (rootNode) {
            if(rootNode.attributes["data-template"] != undefined) {
                TypeScriptTools.BindingTools.EvaluateTemplate(rootNode.attributes["data-template"].nodeValue, rootNode);
            }
        };
        BindingTools.SetTemplatesRecursively = function SetTemplatesRecursively(rootNode) {
            TypeScriptTools.BindingTools.ApplyTemplate(rootNode);
            var els = rootNode.getElementsByTagName("*");
            var l = els.length;
            for(var x = 0; x < l; x++) {
                var node = els[x];
                TypeScriptTools.BindingTools.SetTemplatesRecursively(node);
            }
        };
        BindingTools.SetBindingsRecursively = function SetBindingsRecursively(rootNode) {
            TypeScriptTools.BindingTools.ApplyBinding(rootNode);
            var childrenNodes = rootNode.children;
            var nbChildren = childrenNodes.length;
            for(var i = 0; i < nbChildren; i++) {
                var node = childrenNodes[i];
                TypeScriptTools.BindingTools.SetBindingsRecursively(node);
            }
        };
        BindingTools.GetParentContext = function GetParentContext(node) {
            var parentNode = node;
            while(parentNode.attributes["data-context"] == undefined) {
                parentNode = parentNode.parentNode;
            }
            return parentNode;
        };
        BindingTools.knownTemplates = new Array();
        BindingTools.EvaluateTemplate = function EvaluateTemplate(dataBindingAttribute, node) {
        };
        BindingTools.BindingRegex = new RegExp("^\{Binding [^}]+\}");
        BindingTools.EvaluateDataContext = function EvaluateDataContext(node, isCalledFromDataContext) {
            var contextNode = BindingTools.GetParentContext(node);
            if(!isCalledFromDataContext && contextNode.attributes["data-context-value"] != undefined) {
                return contextNode.attributes["data-context-value"];
            }
            if(contextNode != undefined) {
                var contextExpression = contextNode.attributes["data-context"].nodeValue;
                var isHttpLink = contextExpression.StartWith("/") || contextExpression.StartWith("http://");
                var elements = BindingTools.BindingRegex.exec(contextExpression);
                var parent = contextNode.parentNode;
                if(isHttpLink == true) {
                    if(elements != undefined) {
                        var nbElements = elements.length;
                        for(var i = 0; i < nbElements; i++) {
                            var bindingString = elements[i];
                            var transformed = TypeScriptTools.BindingTools.EvaluateBinding(bindingString, parent, true);
                            contextExpression = contextExpression.replace(bindingString, transformed);
                        }
                    }
                    contextNode["data-context-value"] = TypeScriptTools.FileTools.ReadJsonFile(contextExpression);
                } else if(elements != undefined) {
                    contextNode["data-context-value"] = BindingTools.EvaluateBinding(elements[0], parent, true);
                } else {
                    contextNode["data-context-value"] = eval(contextExpression);
                }
                return contextNode["data-context-value"];
            }
        };
        BindingTools.EvaluateBinding = function EvaluateBinding(bindingExpression, node, isCalledFromDataContext) {
            var dataContextObject = BindingTools.EvaluateDataContext(node, isCalledFromDataContext);
            var parametersString = bindingExpression.TrimStartOnce("{Binding").TrimStartOnce(" ");
            parametersString = parametersString.TrimEndOnce("}");
            var parameters = parametersString.split(",");
            var elementName = null;
            var path = undefined;
            var source = dataContextObject;
            var converter = undefined;
            var converterParameter = undefined;
            var stringFormat = undefined;
            var mode = "OneTime";
            var destination = "Value";
            for(var i = 0; i < parameters.length; i++) {
                var param = parameters[i].split('=');
                if(param.length == 1) {
                    path = param[0];
                } else {
                    switch(param[0]) {
                        case "Path":
                            path = param[1];
                            break;
                        case "ElementName":
                            source = document.getElementsByName(param[1]);
                            break;
                        case "Source":
                            source = BindingTools.EvaluateBinding(param[1], node, false);
                            break;
                        case "Destination":
                            destination = param[1];
                            break;
                        case "Converter":
                            converter = param[1];
                            break;
                        case "ConverterParameter":
                            converterParameter = param[1];
                            break;
                        case "StringFormat":
                            stringFormat = param[1];
                            break;
                        case "Mode":
                            mode = param[1];
                            break;
                        default:
                            break;
                    }
                }
            }
            var value;
            if(source != undefined) {
                value = source[path];
            } else {
                value = source;
            }
            if(isCalledFromDataContext == true) {
                node["data-context-value"] = value;
            } else {
                if(destination == "Value") {
                    (node).innerHTML = value;
                } else {
                    node["destination"] = value;
                }
            }
            return value;
        };
        return BindingTools;
    })();
    TypeScriptTools.BindingTools = BindingTools;    
})(TypeScriptTools || (TypeScriptTools = {}));
$(function () {
    TypeScriptTools.BindingTools.SetBindingsRecursively(document.body);
    TypeScriptTools.BindingTools.SetTemplatesRecursively(document.body);
});
