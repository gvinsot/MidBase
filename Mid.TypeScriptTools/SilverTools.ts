///<reference path="StringTools.ts" />
///<reference path="jquery.d.ts" />

interface Element
{
   RaisePropertyChanged : (string) => void;
}

interface Node 
{
  Rebind : () => void;
  ApplyTemplate : () => void;
}

Node.prototype.Rebind = function ():void
{
    if (this.attributes["data-binding"] != undefined)
    {
        TypeScriptTools.SilverTools.EvaluateBinding(this.attributes["data-binding"]["nodeValue"], this, false);
    }
};

Node.prototype.ApplyTemplate = function ():void
{
    if (this.attributes["data-template"] != undefined)
    {
        TypeScriptTools.SilverTools.EvaluateTemplate(this.attributes["data-template"].nodeValue, this);
    }
};

Element.prototype.RaisePropertyChanged = function (propertyName:string):void
{
    
};


module TypeScriptTools
{
    export class BindingGlobalContext
    {
        BindingDictionary:any = new Object();

        CurrentBindingId: number = 0;

        AddBinding(bindedObject : any, path : string, node:HTMLElement):void
        {
            if (bindedObject["BindingId"] == undefined)
            {
                this.CurrentBindingId++;
                bindedObject["BindingId"] = this.CurrentBindingId.toString();
            }
            var bindingObjectID = bindedObject["BindingId"];
            if (this.BindingDictionary[bindingObjectID] == undefined)
            {
                this.BindingDictionary[bindingObjectID] = new Object();
            }

            var bindingDictionarySubStructure = this.BindingDictionary[bindingObjectID];

            var binding =
                {
                    Path: path,
                    Node: node,
                    BindedObject: bindedObject
                };
            if (bindingDictionarySubStructure[path] == undefined)
            {
                bindingDictionarySubStructure[path] = new Array();
            }

            bindingDictionarySubStructure[path].append(binding);
        };
        RemoveBinding (bindedObject, path, node)
        {
            // this.BindingDictionary[bindedObject["BindingId"]].
        };
        RemoveObjectBindings(bindedObject, path, node)
        {
            // this.BindingDictionary[bindedObject["BindingId"]].
        };
        RemoveNodeBindings(bindedObject, path, node)
        {
            // this.BindingDictionary[bindedObject["BindingId"]].
        };
            RaisePropertyChanged(changedObject, changedPath)
        {
                // this.BindingDictionary[bindedObject["BindingId"]].
            };
    }


    export class SilverTools
    {
        public static Bindings : BindingGlobalContext = new BindingGlobalContext();

        static SetTemplates (rootNode : HTMLElement) : void
        {
            var els = rootNode.getElementsByTagName("*");
            var l = els.length;
            for (var x = 0; x < l; x++)
            {
                var node = els[x];
                node.ApplyTemplate();
            }
        }

        static SetBindings(rootNode : Node) : void
        {
            var childrenNodes = rootNode.childNodes;//.children;
            var nbChildren = childrenNodes.length;
            for (var i = 0; i < nbChildren; i++)
            {
                var node = childrenNodes[i];
                node.Rebind();
                TypeScriptTools.SilverTools.SetBindings(node);
            }
        }

        static GetParentContext(node: Node) : Node
        {
            var parentNode = node;
            while (parentNode.attributes["data-context"] == undefined)
            {
                parentNode = parentNode.parentNode;
            }
            return parentNode;
        }

        static knownTemplates = new Array();

        static EvaluateTemplate(dataBindingAttribute, node)
        {
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
        }

        static bindingRegex = new RegExp("^\{Binding [^}]+\}");

        static EvaluateDataContext(node, isCalledFromDataContext)
        {
            var contextNode = GetParentContext(node);

            if (!isCalledFromDataContext && contextNode.attributes["data-context-value"] != undefined)
            {
                return contextNode.attributes["data-context-value"];
            }

            if (contextNode != undefined)
            {
                var contextExpression = contextNode.attributes["data-context"].nodeValue;

                var isHttpLink = contextExpression.StartWith("/") || contextExpression.StartWith("http://");

                var elements = bindingRegex.exec(contextExpression);
                var parent = contextNode.parentNode;//.getParent();

                if (isHttpLink == true)
                {
                    if (elements != undefined)
                    {
                        var nbElements = elements.length;

                        for (var i = 0; i < nbElements; i++)
                        {
                            var bindingString = elements[i];
                            var transformed = TypeScriptTools.SilverTools.EvaluateBinding(bindingString, parent, true);
                            contextExpression = contextExpression.replace(bindingString, transformed);
                        }
                    }

                    new jQuery.ajax
                    ({
                        async: false,
                        url: contextExpression,
                        method: 'get',
                        noCache: true,
                        onSuccess: function (itemsArray)
                        {
                            contextNode["data-context-value"] = itemsArray;
                        },
                        onFailure: function (ex)
                        {
                            throw "Could not load data";
                        }
                    }).send();
                }
                else if (elements != undefined)
                {
                    contextNode["data-context-value"] = EvaluateBinding(elements[0], parent, true);
                }
                else
                {
                    contextNode["data-context-value"] = eval(contextExpression);
                }
                return contextNode["data-context-value"];
            }
        }


        public static EvaluateBinding(bindingExpression :string, node : Node, isCalledFromDataContext : bool) : any
        {
            var dataContextObject = EvaluateDataContext(node, isCalledFromDataContext);

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
            for (var i = 0; i < parameters.length; i++)
            {
                var param = parameters[i].split('=');

                if (param.length == 1)
                {
                    path = param[0];
                }
                else
                    switch (param[0])
                    {
                        case "Path":
                            path = param[1];
                            break;
                        case "ElementName":
                            source = document.getElementsByName(param[1]);
                            break;
                        case "Source":
                            source = EvaluateBinding(param[1], node, false);
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
                        //case "RelativeSource":
                        //    break;
                        //case "FallbackValue":
                        //    break;
                        case "Mode":
                            mode = param[1];
                            break;
                        //case "TargetNullValue":
                        //    break;
                        default:
                            break;
                    }
            }

            if (source != undefined)
            {
                var value = source[path];
            }
            else
            {
                var value = source;
            }
            //todo : apply converter and stringformat

            //if node is input and mode == twoway then attach events

            if (isCalledFromDataContext == true)
            {
                node["data-context-value"]= value;
            }
            else
            {
                if (destination == "Value")
                {                    
                    (<HTMLElement> node).innerHTML = value;
                }
                else
                {
                    node["destination"]= value;
                }
            }

            return value;
        }
    }
}

$(document).ready = ()=> 
{
    TypeScriptTools.SilverTools.SetBindings(document.body);
};

