///<reference path="StringTools.ts" />
///<reference path="libs/jquery.d.ts" />
///<reference path="EventHandler.ts" />
///<reference path="Interfaces.ts" />
///<reference path="FileTools.ts" />

module TypeScriptTools {

    export class Binding implements IDisposable {
        public Path: string;
        public Node: HTMLElement;
        private _bindedObject: any;

        GetBindedObject(): any {
            return this._bindedObject;
        }

        SetBindedObject(value: any) {
            this._bindedObject = value;

            if (value.PropertyChanged != undefined) {
                (<EventHandler>value.PropertyChanged).Attach(this.UpdateNodeOnContextChange);
            }
        }

        UpdateNodeOnContextChange(): void {
            TypeScriptTools.BindingTools.ApplyBinding(this.Node);
        }

        constructor(path: string, node: HTMLElement, bindedObject: any) {
            this.Path = path;
            this.Node = node;
            this.SetBindedObject(bindedObject);
        }

        public Dispose(): void {
            if (this._bindedObject.PropertyChanged != undefined) {
                (<EventHandler>this._bindedObject).Dettach(this.UpdateNodeOnContextChange);
            }
        }
    }

    export class BindingGlobalContext {
        BindingDictionary: any = new Object();

        CurrentBindingId: number = 0;

        AddBinding(bindedObject: any, path: string, node: HTMLElement): void {
            if (node["BindingId"] == undefined) {
                this.CurrentBindingId++;
                node["BindingId"] = this.CurrentBindingId;
            }
            var bindingId = node["BindingId"];

            var binding = new Binding(path, node, bindedObject);

            this.BindingDictionary[bindingId] = binding;
        }

        RemoveBinding(bindedObject, path, node) {
            if (node["BindingId"] != undefined) {
                var bindingId = node["BindingId"];
                var binding = <Binding>this.BindingDictionary[bindingId];
                binding.Dispose();
                binding = null;
                this.BindingDictionary[bindingId] = null;
            }
        }
    }


    export class BindingTools {
        public static Bindings: BindingGlobalContext = new BindingGlobalContext();


        public static ApplyBinding(rootNode: HTMLElement): void {
            if (rootNode.attributes["data-binding"] != undefined) {
                TypeScriptTools.BindingTools.EvaluateBinding(rootNode.attributes["data-binding"]["nodeValue"], rootNode);
                //apply template
                //BindingTools.ApplyTemplate(rootNode);
            }
        }

        public static ApplyTemplate(rootNode: Node): void {
            if (rootNode.attributes["data-template"] != undefined) {
                TypeScriptTools.BindingTools.EvaluateTemplate(rootNode.attributes["data-template"]["nodeValue"], rootNode);
            }
        }

        public static SetContent(targetNode: string, uri: string) {
            var node = document.getElementById(targetNode);
            node.attributes["data-template"] = uri;
            TypeScriptTools.BindingTools.ApplyTemplate(node);                
        }
        
        public static SetBindingsRecursively(rootNode: HTMLElement, skipCurrentNode:boolean =false): void {
            if (rootNode == null)
                return;

            if (!skipCurrentNode) {
                TypeScriptTools.BindingTools.ApplyBinding(rootNode);
                if (rootNode.attributes["data-binding"] == undefined && rootNode.attributes["data-template"] != undefined) {
                    TypeScriptTools.BindingTools.ApplyTemplate(rootNode);
                    return;
                }
            }
            
            var childrenNodes = rootNode.children;
            var nbChildren = childrenNodes.length;
            for (var i = 0; i < nbChildren; i++) {
                var node = <HTMLElement>childrenNodes[i];
                TypeScriptTools.BindingTools.SetBindingsRecursively(node);
            }
        }

        private static GetParentContext(node: Node): Node {
            var parentNode = node;
            while (parentNode.attributes != null && parentNode.attributes["data-context"] == undefined && parentNode.attributes["data-context-value"] == undefined) {
                parentNode = parentNode.parentNode;
            }
            if (parentNode.attributes == null)
                return null;

            return parentNode;
        }

        private static knownTemplates = new Array();

        private static EvaluateTemplate(bindingExpression: string, node: Node): void {
         
            var dataTemplateAttribute = node.attributes["data-template"];
            if (dataTemplateAttribute == undefined)
                return;
            var dataTemplateAttributreValue = dataTemplateAttribute.nodeValue == undefined ? dataTemplateAttribute : dataTemplateAttribute.nodeValue;
            var dataContextObject = BindingTools.EvaluateDataContext(node);
            var templateExpression = BindingTools.EvaluateExpression(dataTemplateAttributreValue, dataContextObject,node,false);            
            var templateString = TypeScriptTools.FileTools.ReadHtmlFile(templateExpression);
            node["data-template-value"] = templateString;

            var dataSourceAttribute = node.attributes["data-source"];
            //TODO : retrive data source
            if (dataSourceAttribute != undefined) {

                var items = BindingTools.EvaluateExpression(dataSourceAttribute.nodeValue,dataContextObject,node);
                node["data-source-value"] = items;

                //lets loop through context items
                for (var i = 0; i < items.length; i++) {

                    var copyString = (new String(templateString)).toString();    
                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = copyString;
                    var result = wrapper.firstChild;
                    result.attributes["data-context-value"] = items[i];
                    node.appendChild(result);
                    BindingTools.SetBindingsRecursively(result as HTMLElement);                
                }            
            }
            else {
                node.textContent = "";
                (<HTMLElement>node).innerHTML = templateString;
                BindingTools.SetBindingsRecursively(node as HTMLElement, true);
            }
        }

        
        private static EvaluateDataContext(node): Object {
            var contextNode = BindingTools.GetParentContext(node);

            if (contextNode == undefined)
                return null;

            if (contextNode.attributes["data-context-value"] != undefined) 
                return contextNode.attributes["data-context-value"];
            
            var contextExpression = contextNode.attributes["data-context"].nodeValue;
            var datacontext = BindingTools.EvaluateDataContext(contextNode.parentNode);
            var result = BindingTools.EvaluateExpression(contextExpression, datacontext, contextNode);

            contextNode.attributes["data-context-value"] = result;

            return result;
        }
        


        private static EvaluateBinding(bindingExpression: string, node: Node): any {
            var dataContextObject = BindingTools.EvaluateDataContext(node);

            return BindingTools.EvaluateExpression(bindingExpression, dataContextObject, node)
        }

        private static BindingRegex = new RegExp("{Binding[^}]*\}");

        private static EvaluateExpression(expression: string, datacontext: any, contextNode: Node, expectObjectResult: boolean = true): any {

            var isHttpLink = expression.StartWith("/") || expression.StartWith("http://");
            var elements = BindingTools.BindingRegex.exec(expression);
            var parent = contextNode.parentNode;

            if (isHttpLink == true) {
                if (elements != undefined) {
                    var nbElements = elements.length;

                    for (var i = 0; i < nbElements; i++) {
                        var bindingString = elements[i];
                        var transformed = TypeScriptTools.BindingTools.EvaluateBindingExpression(bindingString,datacontext, parent);
                        expression = expression.replace(bindingString, transformed);
                    }
                }
                if (!expectObjectResult)
                    return expression;
                else
                    return TypeScriptTools.FileTools.ReadJsonFile(expression);          
            }
            else if (elements != undefined) {
                let result = [];
                for (var i = 0; i < elements.length; i++) {
                    result[i]=  BindingTools.EvaluateBindingExpression(elements[0], datacontext, contextNode);
                }
                if (result.length == 1)
                    return result[0];
                else
                    return result; 
            }
            else {
                return eval(expression);
            }
            return null;
        }


        private static EvaluateBindingExpression(bindingExpression: string, dataContextObject:any, node: Node): any {

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
            var externEffects = false;
            for (var i = 0; i < parameters.length; i++) {
                var param = parameters[i].split('=');

                if (param.length == 1) {
                    path = param[0];
                }
                else
                    switch (param[0]) {
                        case "Path":
                            path = param[1];
                            break;
                        case "ElementName":
                            source = document.getElementsByName(param[1]);
                            break;
                        case "Source":
                            source = BindingTools.EvaluateBinding(param[1], node);
                            break;
                        case "Destination":
                            destination = param[1];
                            externEffects = true;
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

            if (source != undefined) {
                var sourceString = Object.prototype.toString.call(source) === '[object Array]' ? 'source' : 'source.'; 
                value = eval(sourceString + path);
                
            }
            else {
                value = source;
            }
            //todo : apply converter and stringformat

            //if node is input and mode == twoway then attach events

           // if (isCalledFromDataContext == true) {
           //     return value;
            //}
            //    else 
            if (externEffects)
            {
                if (destination == "Content") {
                    (<HTMLElement>node).innerHTML = value;
                }
                else {
                    node.attributes[destination].value = value;
                }
            }


            return value;
        }
    }
}

$(() => {
    TypeScriptTools.BindingTools.SetBindingsRecursively(document.body);
});

