///<reference path="StringTools.ts" />
///<reference path="jquery.d.ts" />
///<reference path="EventHandler.ts" />
var TypeScriptTools;
(function (TypeScriptTools) {
    var Binding = (function () {
        function Binding(path, node, bindedObject) {
            this.Path = path;
            this.Node = node;
            this.SetBindedObject(bindedObject);
        }
        Binding.prototype.GetBindedObject = function () {
            return this._bindedObject;
        };

        Binding.prototype.SetBindedObject = function (value) {
            this._bindedObject = value;

            if (value.PropertyChanged != undefined) {
                (value.PropertyChanged).Attach(this.UpdateNodeOnContextChange);
            }
        };

        Binding.prototype.UpdateNodeOnContextChange = function () {
            TypeScriptTools.BindingTools.ApplyBinding(this.Node);
        };

        Binding.prototype.Dispose = function () {
            if (this._bindedObject.PropertyChanged != undefined) {
                (this._bindedObject).Dettach(this.UpdateNodeOnContextChange);
            }
        };
        return Binding;
    })();
    TypeScriptTools.Binding = Binding;

    var BindingGlobalContext = (function () {
        function BindingGlobalContext() {
            this.BindingDictionary = new Object();
            this.CurrentBindingId = 0;
        }
        BindingGlobalContext.prototype.AddBinding = function (bindedObject, path, node) {
            if (node["BindingId"] == undefined) {
                this.CurrentBindingId++;
                node["BindingId"] = this.CurrentBindingId;
            }
            var bindingId = node["BindingId"];

            var binding = new Binding(path, node, bindedObject);

            this.BindingDictionary[bindingId] = binding;
        };

        BindingGlobalContext.prototype.RemoveBinding = function (bindedObject, path, node) {
            if (node["BindingId"] != undefined) {
                var bindingId = node["BindingId"];
                var binding = this.BindingDictionary[bindingId];
                binding.Dispose();
                binding = null;
                this.BindingDictionary[bindingId] = null;
            }
        };
        return BindingGlobalContext;
    })();
    TypeScriptTools.BindingGlobalContext = BindingGlobalContext;

    var BindingTools = (function () {
        function BindingTools() {
        }
        BindingTools.ApplyBinding = function (rootNode) {
            if (rootNode.attributes["data-binding"] != undefined) {
                TypeScriptTools.BindingTools.EvaluateBinding(rootNode.attributes["data-binding"]["nodeValue"], rootNode, false);
            }
        };

        BindingTools.ApplyTemplate = function (rootNode) {
            if (rootNode.attributes["data-template"] != undefined) {
                TypeScriptTools.BindingTools.EvaluateTemplate(rootNode.attributes["data-template"].nodeValue, rootNode);
            }
        };

        BindingTools.SetTemplatesRecursively = function (rootNode) {
            if (rootNode == null)
                return;

            TypeScriptTools.BindingTools.ApplyTemplate(rootNode);
            var els = rootNode.getElementsByTagName("*");
            var l = els.length;
            for (var x = 0; x < l; x++) {
                var node = els[x];
                TypeScriptTools.BindingTools.SetTemplatesRecursively(node);
            }
        };

        BindingTools.SetBindingsRecursively = function (rootNode) {
            if (rootNode == null)
                return;

            TypeScriptTools.BindingTools.ApplyBinding(rootNode);
            var childrenNodes = rootNode.children;
            var nbChildren = childrenNodes.length;
            for (var i = 0; i < nbChildren; i++) {
                var node = childrenNodes[i];
                TypeScriptTools.BindingTools.SetBindingsRecursively(node);
            }
        };

        BindingTools.GetParentContext = function (node) {
            var parentNode = node;
            while (parentNode.attributes["data-context"] == undefined) {
                parentNode = parentNode.parentNode;
            }
            return parentNode;
        };

        BindingTools.EvaluateTemplate = function (dataBindingAttribute, node) {
            // {TemplateBinding ?}
            //HTML Unordered Lists
            //<ul>
            //<li>Coffee</li>
            //<li>Milk</li>
            //</ul>
            //HTML Ordered Lists
            //<ol>
            //<li>Coffee</li>
            //<li>Milk</li>
            //</ol>
            //    HTML Definition Lists
            //    A definition list is a list of items, with a description of each item.
            //    The <dl> tag defines a definition list.
            //    The <dl> tag is used in conjunction with <dt> (defines the item in the list) and <dd> (describes the item in the list):
            //<dl>
            //<dt>Coffee</dt>
            //<dd>- black hot drink</dd>
            //<dt>Milk</dt>
            //<dd>- white cold drink</dd>
            //</dl>
            //if node is a list
            //apply template to all items
            //else apply template once
            // replace item of template with Name=PART_Content with the content of the item
        };

        BindingTools.EvaluateDataContext = function (node, isCalledFromDataContext) {
            var contextNode = BindingTools.GetParentContext(node);

            if (!isCalledFromDataContext && contextNode.attributes["data-context-value"] != undefined) {
                return contextNode.attributes["data-context-value"];
            }

            if (contextNode != undefined) {
                var contextExpression = contextNode.attributes["data-context"].nodeValue;

                var isHttpLink = contextExpression.StartWith("/") || contextExpression.StartWith("http://");

                var elements = BindingTools.BindingRegex.exec(contextExpression);
                var parent = contextNode.parentNode;

                if (isHttpLink == true) {
                    if (elements != undefined) {
                        var nbElements = elements.length;

                        for (var i = 0; i < nbElements; i++) {
                            var bindingString = elements[i];
                            var transformed = TypeScriptTools.BindingTools.EvaluateBinding(bindingString, parent, true);
                            contextExpression = contextExpression.replace(bindingString, transformed);
                        }
                    }

                    contextNode["data-context-value"] = TypeScriptTools.FileTools.ReadJsonFile(contextExpression);
                } else if (elements != undefined) {
                    contextNode["data-context-value"] = BindingTools.EvaluateBinding(elements[0], parent, true);
                } else {
                    contextNode["data-context-value"] = eval(contextExpression);
                }
                return contextNode["data-context-value"];
            }
        };

        BindingTools.EvaluateBinding = function (bindingExpression, node, isCalledFromDataContext) {
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
            var destination = "Content";
            for (var i = 0; i < parameters.length; i++) {
                var param = parameters[i].split('=');

                if (param.length == 1) {
                    path = param[0];
                } else
                    switch (param[0]) {
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
            var value;

            if (source != undefined) {
                value = source[path];
            } else {
                value = source;
            }

            if (isCalledFromDataContext == true) {
                node["data-context-value"] = value;
            } else {
                if (destination == "Content") {
                    (node).innerHTML = value;
                } else {
                    node["destination"] = value;
                }
            }

            return value;
        };
        BindingTools.Bindings = new BindingGlobalContext();

        BindingTools.knownTemplates = new Array();

        BindingTools.BindingRegex = new RegExp("^\{Binding [^}]+\}");
        return BindingTools;
    })();
    TypeScriptTools.BindingTools = BindingTools;
})(TypeScriptTools || (TypeScriptTools = {}));

$(function () {
    TypeScriptTools.BindingTools.SetBindingsRecursively(document.body);

    TypeScriptTools.BindingTools.SetTemplatesRecursively(document.body);
});
