Node.prototype.Rebind = function () {
    if(this.attributes["data-binding"] != undefined) {
        TypeScriptTools.SilverTools.EvaluateBinding(this.attributes["data-binding"]["nodeValue"], this, false);
    }
};
Node.prototype.ApplyTemplate = function () {
    if(this.attributes["data-template"] != undefined) {
        TypeScriptTools.SilverTools.EvaluateTemplate(this.attributes["data-template"].nodeValue, this);
    }
};
Element.prototype.RaisePropertyChanged = function (propertyName) {
};
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
            var bindingObjectID = bindedObject["BindingId"];
            if(this.BindingDictionary[bindingObjectID] == undefined) {
                this.BindingDictionary[bindingObjectID] = new Object();
            }
            var bindingDictionarySubStructure = this.BindingDictionary[bindingObjectID];
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
    var SilverTools = (function () {
        function SilverTools() { }
        SilverTools.Bindings = new BindingGlobalContext();
        SilverTools.SetTemplates = function SetTemplates(rootNode) {
            var els = rootNode.getElementsByTagName("*");
            var l = els.length;
            for(var x = 0; x < l; x++) {
                var node = els[x];
                node.ApplyTemplate();
            }
        };
        SilverTools.SetBindings = function SetBindings(rootNode) {
            var childrenNodes = rootNode.childNodes;
            var nbChildren = childrenNodes.length;
            for(var i = 0; i < nbChildren; i++) {
                var node = childrenNodes[i];
                node.Rebind();
                TypeScriptTools.SilverTools.SetBindings(node);
            }
        };
        SilverTools.GetParentContext = function GetParentContext(node) {
            var parentNode = node;
            while(parentNode.attributes["data-context"] == undefined) {
                parentNode = parentNode.parentNode;
            }
            return parentNode;
        };
        SilverTools.knownTemplates = new Array();
        SilverTools.EvaluateTemplate = function EvaluateTemplate(dataBindingAttribute, node) {
        };
        SilverTools.bindingRegex = new RegExp("^\{Binding [^}]+\}");
        SilverTools.EvaluateDataContext = function EvaluateDataContext(node, isCalledFromDataContext) {
            var contextNode = SilverTools.GetParentContext(node);
            if(!isCalledFromDataContext && contextNode.attributes["data-context-value"] != undefined) {
                return contextNode.attributes["data-context-value"];
            }
            if(contextNode != undefined) {
                var contextExpression = contextNode.attributes["data-context"].nodeValue;
                var isHttpLink = contextExpression.StartWith("/") || contextExpression.StartWith("http://");
                var elements = SilverTools.bindingRegex.exec(contextExpression);
                var parent = contextNode.parentNode;
                if(isHttpLink == true) {
                    if(elements != undefined) {
                        var nbElements = elements.length;
                        for(var i = 0; i < nbElements; i++) {
                            var bindingString = elements[i];
                            var transformed = TypeScriptTools.SilverTools.EvaluateBinding(bindingString, parent, true);
                            contextExpression = contextExpression.replace(bindingString, transformed);
                        }
                    }
                    new jQuery.ajax({
                        async: false,
                        url: contextExpression,
                        method: 'get',
                        noCache: true,
                        onSuccess: function (itemsArray) {
                            contextNode["data-context-value"] = itemsArray;
                        },
                        onFailure: function (ex) {
                            throw "Could not load data";
                        }
                    }).send();
                } else if(elements != undefined) {
                    contextNode["data-context-value"] = SilverTools.EvaluateBinding(elements[0], parent, true);
                } else {
                    contextNode["data-context-value"] = eval(contextExpression);
                }
                return contextNode["data-context-value"];
            }
        };
        SilverTools.EvaluateBinding = function EvaluateBinding(bindingExpression, node, isCalledFromDataContext) {
            var dataContextObject = SilverTools.EvaluateDataContext(node, isCalledFromDataContext);
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
                            source = SilverTools.EvaluateBinding(param[1], node, false);
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
            if(source != undefined) {
                var value = source[path];
            } else {
                var value = source;
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
        return SilverTools;
    })();
    TypeScriptTools.SilverTools = SilverTools;    
})(TypeScriptTools || (TypeScriptTools = {}));
window.onload = function () {
    TypeScriptTools.SilverTools.SetBindings(document.body);
};
