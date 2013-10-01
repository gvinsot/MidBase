///<reference path="StringTools.ts" />
///<reference path="jquery.d.ts" />
Object.prototype.Rebind = function () {
    if (this.attributes["data-binding"] != undefined) {
        TypeScriptTools.SilverTools.EvaluateBinding(this.attributes["data-binding"]["nodeValue"], this, false);
    }
};

$.extend(Object.prototype, {
    Rebind: function () {
        if (this.attributes["data-binding"] != undefined) {
            TypeScriptTools.SilverTools.EvaluateBinding(this.attributes["data-binding"]["nodeValue"], this, false);
        }
    }
});

$.extend(Object.prototype, {
    ApplyTemplate: function () {
        if (this.attributes["data-template"] != undefined) {
            TypeScriptTools.SilverTools.EvaluateTemplate(this.attributes["data-template"].nodeValue, this);
        }
    }
});

$.extend(Object.prototype, {
    RaisePropertyChanged: function () {
        //TODO
    }
});

var TypeScriptTools;
(function (TypeScriptTools) {
    var BindingGlobalContext = (function () {
        function BindingGlobalContext() {
            this.BindingDictionary = new Object();
            this.CurrentBindingId = 0;
        }
        BindingGlobalContext.prototype.AddBinding = function (bindedObject, path, node) {
            if (bindedObject["BindingId"] == undefined) {
                this.CurrentBindingId++;
                bindedObject["BindingId"] = this.CurrentBindingId.toString();
            }
            var bindingObjectId = bindedObject["BindingId"];
            if (this.BindingDictionary[bindingObjectId] == undefined) {
                this.BindingDictionary[bindingObjectId] = new Object();
            }

            var bindingDictionarySubStructure = this.BindingDictionary[bindingObjectId];

            var binding = {
                Path: path,
                Node: node,
                BindedObject: bindedObject
            };
            if (bindingDictionarySubStructure[path] == undefined) {
                bindingDictionarySubStructure[path] = new Array();
            }

            bindingDictionarySubStructure[path].append(binding);
        };

        BindingGlobalContext.prototype.RemoveBinding = function (bindedObject, path, node) {
            // this.BindingDictionary[bindedObject["BindingId"]].
        };

        BindingGlobalContext.prototype.RemoveObjectBindings = function (bindedObject, path, node) {
            // this.BindingDictionary[bindedObject["BindingId"]].
        };

        BindingGlobalContext.prototype.RemoveNodeBindings = function (bindedObject, path, node) {
            // this.BindingDictionary[bindedObject["BindingId"]].
        };

        BindingGlobalContext.prototype.RaisePropertyChanged = function (changedObject, changedPath) {
            // this.BindingDictionary[bindedObject["BindingId"]].
        };
        return BindingGlobalContext;
    })();
    TypeScriptTools.BindingGlobalContext = BindingGlobalContext;

    var SilverTools = (function () {
        function SilverTools() {
        }
        SilverTools.SetTemplates = function (rootNode) {
            var els = rootNode.getElementsByTagName("*");
            var l = els.length;
            for (var x = 0; x < l; x++) {
                var node = els[x];
                node.ApplyTemplate();
            }
        };

        SilverTools.SetBindings = function (rootNode) {
            var childrenNodes = rootNode.children;
            var nbChildren = childrenNodes.length;
            for (var i = 0; i < nbChildren; i++) {
                var node = childrenNodes[i];
                node.Rebind();
                TypeScriptTools.SilverTools.SetBindings(node);
            }
        };

        SilverTools.GetParentContext = function (node) {
            var parentNode = node;
            while (parentNode.attributes["data-context"] == undefined) {
                parentNode = parentNode.parentNode;
            }
            return parentNode;
        };

        SilverTools.EvaluateTemplate = function (dataBindingAttribute, node) {
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

        SilverTools.EvaluateDataContext = function (node, isCalledFromDataContext) {
            var contextNode = SilverTools.GetParentContext(node);

            if (!isCalledFromDataContext && contextNode.attributes["data-context-value"] != undefined) {
                return contextNode.attributes["data-context-value"];
            }

            if (contextNode != undefined) {
                var contextExpression = contextNode.attributes["data-context"].nodeValue;

                var isHttpLink = contextExpression.StartWith("/") || contextExpression.StartWith("http://");

                var elements = SilverTools.BindingRegex.exec(contextExpression);
                var parent = contextNode.parentNode;

                if (isHttpLink == true) {
                    if (elements != undefined) {
                        var nbElements = elements.length;

                        for (var i = 0; i < nbElements; i++) {
                            var bindingString = elements[i];
                            var transformed = TypeScriptTools.SilverTools.EvaluateBinding(bindingString, parent, true);
                            contextExpression = contextExpression.replace(bindingString, transformed);
                        }
                    }

                    jQuery.ajax({
                        async: false,
                        url: contextExpression,
                        type: 'GET',
                        dataType: 'json',
                        cache: false,
                        success: function (itemsArray) {
                            contextNode["data-context-value"] = itemsArray;
                        },
                        error: function (ex) {
                            throw "Could not load data";
                        }
                    });
                } else if (elements != undefined) {
                    contextNode["data-context-value"] = SilverTools.EvaluateBinding(elements[0], parent, true);
                } else {
                    contextNode["data-context-value"] = eval(contextExpression);
                }
                return contextNode["data-context-value"];
            }
        };

        SilverTools.EvaluateBinding = function (bindingExpression, node, isCalledFromDataContext) {
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
            var value;

            if (source != undefined) {
                value = source[path];
            } else {
                value = source;
            }

            if (isCalledFromDataContext == true) {
                node["data-context-value"] = value;
            } else {
                if (destination == "Value") {
                    (node).innerHTML = value;
                } else {
                    node["destination"] = value;
                }
            }

            return value;
        };
        SilverTools.Bindings = new BindingGlobalContext();

        SilverTools.knownTemplates = new Array();

        SilverTools.BindingRegex = new RegExp("^\{Binding [^}]+\}");
        return SilverTools;
    })();
    TypeScriptTools.SilverTools = SilverTools;
})(TypeScriptTools || (TypeScriptTools = {}));

$(function () {
    TypeScriptTools.SilverTools.SetBindings(document.body);
});
