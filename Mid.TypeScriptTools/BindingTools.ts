///<reference path="StringTools.ts" />
///<reference path="jquery.d.ts" />
///<reference path="EventHandler.ts" />

module TypeScriptTools
{

    export class Binding implements IDisposable
    {
        public Path: string;
        public Node: HTMLElement;
        private _bindedObject: any;

        GetBindedObject(): any
        {
            return this._bindedObject;
        }

        SetBindedObject(value:any)
        {                        
            this._bindedObject = value;

            if (value.PropertyChanged != undefined)
            {
                (<EventHandler> value.PropertyChanged).Attach(this.UpdateNodeOnContextChange);
            }
        }

        UpdateNodeOnContextChange():void
        {
            TypeScriptTools.BindingTools.ApplyBinding(this.Node);
        }

        constructor (path: string, node: HTMLElement, bindedObject: any)
        {
            this.Path = path;
            this.Node = node;
            this.SetBindedObject(bindedObject);
        }

        public Dispose(): void
        { 
            if (this._bindedObject.PropertyChanged != undefined)
            {
                (<EventHandler> this._bindedObject).Dettach(this.UpdateNodeOnContextChange);
            }
        }
    }

    export class BindingGlobalContext
    {
        BindingDictionary:any = new Object();

        CurrentBindingId: number = 0;

        AddBinding(bindedObject : any, path : string, node:HTMLElement):void
        {
            if (node["BindingId"] == undefined)
            {
                this.CurrentBindingId++;
                node["BindingId"] = this.CurrentBindingId;
            }
            var bindingId = node["BindingId"];

            var binding = new Binding(path, node, bindedObject);

            this.BindingDictionary[bindingId]=binding;
        }

        RemoveBinding (bindedObject, path, node)
        {
            if (node["BindingId"] != undefined)
            {
                var bindingId = node["BindingId"];
                var binding = <Binding> this.BindingDictionary[bindingId];
                binding.Dispose();
                binding = null;
                this.BindingDictionary[bindingId] = null;                
            }
        }
    }


    export class BindingTools
    {
        public static Bindings : BindingGlobalContext = new BindingGlobalContext();


        public static ApplyBinding(rootNode: HTMLElement):void
        {
            if (rootNode.attributes["data-binding"] != undefined)
            {
                TypeScriptTools.BindingTools.EvaluateBinding(rootNode.attributes["data-binding"]["nodeValue"], rootNode, false);
            }
        }

        public static ApplyTemplate(rootNode: HTMLElement) :void
        {
            if (rootNode.attributes["data-template"] != undefined)
            {
                TypeScriptTools.BindingTools.EvaluateTemplate(rootNode.attributes["data-template"].nodeValue, rootNode);
            }
        }


        public static SetTemplatesRecursively(rootNode : HTMLElement) : void
        {
            if (rootNode == null)
                return;

            TypeScriptTools.BindingTools.ApplyTemplate(rootNode);
            var els = rootNode.getElementsByTagName("*");
            var l = els.length;
            for (var x = 0; x < l; x++)
            {
                var node = els[x];
                TypeScriptTools.BindingTools.SetTemplatesRecursively(<HTMLElement> node);
            }
        }

        public static SetBindingsRecursively(rootNode : HTMLElement) : void
        {
            if (rootNode == null)
                return;

            TypeScriptTools.BindingTools.ApplyBinding(rootNode);
            var childrenNodes = rootNode.children;
            var nbChildren = childrenNodes.length;            
            for (var i = 0; i < nbChildren; i++)
            {
                var node = <HTMLElement> childrenNodes[i];
                TypeScriptTools.BindingTools.SetBindingsRecursively(node);
            }
        }

        private static GetParentContext(node: Node) : Node
        {
            var parentNode = node;
            while (parentNode.attributes["data-context"] == undefined)
            {
                parentNode = parentNode.parentNode;
            }
            return parentNode;
        }

        private static knownTemplates = new Array();

        private static EvaluateTemplate(dataBindingAttribute : HTMLElement, node: HTMLElement):void
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

        private static BindingRegex = new RegExp("^\{Binding [^}]+\}");

        private static EvaluateDataContext(node, isCalledFromDataContext)
        {
            var contextNode = BindingTools.GetParentContext(node);

            if (!isCalledFromDataContext && contextNode.attributes["data-context-value"] != undefined)
            {
                return contextNode.attributes["data-context-value"];
            }

            if (contextNode != undefined)
            {
                var contextExpression = contextNode.attributes["data-context"].nodeValue;

                var isHttpLink = contextExpression.StartWith("/") || contextExpression.StartWith("http://");

                var elements = BindingTools.BindingRegex.exec(contextExpression);
                var parent = contextNode.parentNode;

                if (isHttpLink == true)
                {
                    if (elements != undefined)
                    {
                        var nbElements = elements.length;

                        for (var i = 0; i < nbElements; i++)
                        {
                            var bindingString = elements[i];
                            var transformed = TypeScriptTools.BindingTools.EvaluateBinding(bindingString, parent, true);
                            contextExpression = contextExpression.replace(bindingString, transformed);
                        }
                    }

                    contextNode["data-context-value"] = TypeScriptTools.FileTools.ReadJsonFile(contextExpression);
                   
                }
                else if (elements != undefined)
                {
                    contextNode["data-context-value"] = BindingTools.EvaluateBinding(elements[0], parent, true);
                }
                else
                {
                    contextNode["data-context-value"] = eval(contextExpression);
                }
                return contextNode["data-context-value"];
            }
        }


        private static EvaluateBinding(bindingExpression :string, node : Node, isCalledFromDataContext : boolean) : any
        {
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
            var value;

            if (source != undefined)
            {
                value = source[path];
            }
            else
            {
                value = source;
            }
            //todo : apply converter and stringformat

            //if node is input and mode == twoway then attach events

            if (isCalledFromDataContext == true)
            {
                node["data-context-value"]= value;
            }
            else
            {
                if (destination == "Content")
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

$(()=> 
{
    TypeScriptTools.BindingTools.SetBindingsRecursively(document.body);

    TypeScriptTools.BindingTools.SetTemplatesRecursively(document.body);
});

