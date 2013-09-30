/// <reference path="silverscript.mootools.js" />
/// <reference path="silverscript.string.js" />

//if (typeof (loadedScripts) == 'undefined')
//{
//    var loadedScripts = new Array();
//}

//function ImportScript(jsFile)
//{
//    if (loadedScripts[jsFile] != null)
//    {
//        return;
//    }
//    var scriptElt = document.createElement('script');
//    scriptElt.type = 'text/javascript';
//    scriptElt.src = jsFile;
//    document.getElementsByTagName('head')[0].appendChild(scriptElt);
//    loadedScripts[jsFile] = jsFile; // or whatever value your prefer
//}

//ImportScript('silverscript.string.js');



Element.prototype.Rebind = function ()
{
    if (this.attributes["data-binding"] != undefined)
    {
        EvaluateBinding(this.attributes["data-binding"].nodeValue, this, false);
    }
};

Element.prototype.ApplyTemplate = function ()
{
    if (this.attributes["data-template"] != undefined)
    {
        EvaluateTemplate(this.attributes["data-template"].nodeValue, this);
    }
};

Element.prototype.RaisePropertyChanged = function (propertyName)
{
    
};

Bindings =
{
    BindingDictionary: new Object(),
    CurrentBindingId:0,
    AddBinding:function(bindedObject,path,node)
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

       var binding= 
           {
               Path:path,
               Node: node,
               BindedObject:bindedObject
           };
       if (bindingDictionarySubStructure[path] == undefined)
       {
           bindingDictionarySubStructure[path] = new Array();
       }

       bindingDictionarySubStructure[path].append(binding);
    },
    RemoveBinding:function(bindedObject,path,node)
    {
          // this.BindingDictionary[bindedObject["BindingId"]].
    },
    RemoveObjectBindings: function (bindedObject, path, node)
    {
        // this.BindingDictionary[bindedObject["BindingId"]].
    },
    RemoveNodeBindings: function (bindedObject, path, node)
    {
        // this.BindingDictionary[bindedObject["BindingId"]].
    },
    RaisePropertyChanged: function (changedObject,changedPath)
    {
        // this.BindingDictionary[bindedObject["BindingId"]].
    }

};

function SetTemplates(rootNode)
{
    var els = rootNode.getElementsByTagName("*");
    var l = els.length;
    for (var x = 0; x < l; x++)
    {
        var node = els[x];
        node.ApplyTemplate();
    }
}

function SetBindings(rootNode)
{
    var childrenNodes = rootNode.getChildren();
    var nbChildren = childrenNodes.length;
    for (var i = 0; i < nbChildren; i++)
    {
        var node = childrenNodes[i];
        node.Rebind();
        SetBindings(node);
    }
}

function GetParentContext(node)
{
    var parentNode = node;
    while (parentNode.attributes["data-context"] == undefined)
    {
        parentNode = parentNode.getParent()
    }
    return parentNode;
}

var knownTemplates = new Array();

function EvaluateTemplate(dataBindingAttribute, node)
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

var bindingRegex = new RegExp("^\{Binding [^}]+\}");

function EvaluateDataContext(node,isCalledFromDataContext)
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
        var parent = contextNode.getParent();

        if (isHttpLink == true)
        {
            if (elements != undefined)
            {
                var nbElements = elements.length;

                for (var i = 0; i < nbElements; i++)
                {
                    var bindingString = elements[i];
                    var transformed = EvaluateBinding(bindingString, parent, true);
                    contextExpression = contextExpression.replace(bindingString, transformed);
                }
            }

            new Request.JSON
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
            contextNode["data-context-value"]= eval(dataContextExpression);
        }
        return contextNode["data-context-value"];
    }
}


function EvaluateBinding(bindingExpression, node, isCalledFromDataContext)
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
                    source = EvaluateBinding(param[1], node);
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
        node.set('data-context-value', value);
    }
    else
    {
        if (destination == "Value")
        {
            node.innerHTML = value;
        }
        else
        {
            node.set(destination, value);
        }
    }

    return value;
}

window.addEvent('domready', function ()
{
    SetBindings(document.body);
});

/*
function ShowList(targetNodeName, sourceUri, itemRepresentationUri,noCache)
{
    new Request.JSON
    ({
        url: sourceUri,
        method: 'get',
        noCache: $defined(noCache) ? noCache : true,
        onSuccess: function (itemsArray)
        {
            ShowListFromArray(targetNodeName, itemRepresentationUri, itemsArray,noCache);
        },
        onFailure: function (ex) { $(targetNodeName).set('text', 'The json request failed with code ' + ex.status); }
    }).send();
}


function ShowListFromArray(targetNodeName, itemRepresentationUri, itemsArray,noCache)
{
    new Request.HTML
    ({
        url: itemRepresentationUri,
        method: 'get',
        evalScripts: true,
        noCache: $defined(noCache)?noCache:true,
        onSuccess: function (responseTree,responseElements,responseHtml)
        {
            var targetNode = $(targetNodeName);
            targetNode.set('text', '');
            var len = itemsArray.length;
            var htmlRepresentation = responseHtml;
            var resultHtml="";
            for (var i = 0; i < len; i++)
            {
                resultHtml += htmlRepresentation.substitute(itemsArray[i]); //.adopt(newNode);
            }
            targetNode.set('html', resultHtml);
            
            len = targetNode.childNodes.length;
           for(var i=0;i<len;i++)
            {
                var node = targetNode.childNodes[i];
               try
               {
               node.setStyle('display','none');
               node.setStyle('display','block');
               }
               catch (exception)
               {
               }
            }
        },
        onFailure: function (ex) { $(targetNodeName).set('text', 'The html request failed with code ' + ex.status); }
    }).send();
}


function UseHtml(targetNodeName, pageUri,bindingObject, milliseconds)
{
    var node = $(targetNodeName);
    
    node.set('text', '');

    var hasSilverlight = Silverlight.isInstalled('3.0')
    var waitNode;

    if ((!hasSilverlight)||(navigator.appVersion.contains('Chrome')))
    {
        waitNode = new Element('img',
        {
            'src': '/images/Synchronising.png',
            'styles':
            {
                'margin-top': '250px',
                'margin-left': '400px'
            }
        });
        node.adopt(waitNode);
    }
    else
    {
        waitNode = new Element('div',
        {
            'id': 'silverlightWaitAnimationHost'
        });
        node.adopt(waitNode);
        Silverlight.createObject(
            "/Animations/WaitAnimation.xap",  // source
            waitNode,  // parent element
            "slPlugin",  // id for generated object element
            {
            width: "64", height: "64",
            version: "3.0.0.0", autoUpgrade: false,
            alt: "loading..."
             }
        );
    }
    new Request.HTML
    ({
        url: pageUri,
        method: 'get',
        evalScripts: true,
        onSuccess: function (html)
        {
            if (bindingObject != undefined)
                html = html.substitute(bindingObject);
            //Clear the text currently inside the results div.  
            waitNode.setStyle('display', 'none');
            node.fade('out');
            node.set('text', '');
            //Inject the new DOM elements into the results div.
            node.adopt(html);
            AttachMidEvents(node);
            scroll(0, 0);
            node.fade('in');
        },
        onFailure: function (ex) { $(targetNodeName).set('text', 'The request failed with code ' + ex.status); }
    }).send();
}
*/
//define regxps

var regexp_email = "[A-Za-z0-9_-]+(.[A-Za-z0-9_-])*@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,5}$";
var regexp_notempty = "^.+$";
var regexp_titleformat = "^[^/\";\\[\\]{}()_#~µ*¤@<>^\\\\§]{4,}$";
var regexp_pseudo = "^[^/\";\\[\\]{}()_#~µ*¤@<>^\\\\§]{2,}$";
var regexp_password = "^[^/\";\\[\\]{}()_#~µ*¤@<>^\\\\§]{6,}$";
var regexp_chaine = "^([/w]+)$";
var regexp_number = "^[0-9]+$";
var regexp_zipCode = "^[0-9]{4,}$";
var regexp_creditcardNumber = "^[0-9]{16}$";
var regexp_creditcardExpiration = "^[0-9]{2}/[0-9]{2}$";
var regexp_creditcardSecurityCode = "^[0-9]{3,4}$";
var regexp_uri = "^((http://|https://)(([A-Za-z0-9-]+\\.)+[A-Za-z]{2,6}|localhost)){0,1}/[^ ]*$";



function SetInputValidation(inputId, regExpString, originalText)
{
    var input = $(inputId);
    input.set('value', originalText);
    input.setStyle('color', 'gray');
    input.setStyle('font-style', 'italic');
    input.addEvent('click', function ()
    {
        if (this.getStyle('color') == 'gray')
        {
            this.setStyle('color', 'black');
            this.setStyle('font-style', 'normal');
            this.set('value', '');
        }
    });
    input.addEvent('keydown', function ()
    {
        if (this.getStyle('color') == 'gray')
        {
            this.setStyle('color', 'black');
            this.setStyle('font-style', 'normal');
            this.set('value', '');
        }
        window.setTimeout(function ()
        {
            if (!input.get('value').test(regExpString))
                input.setStyle('background-color', '#FFDDDD');
            else
                input.setStyle('background-color', '#DDFFDD');
        }, 1)
    });
}

function ShowHide(NodeID)
{
    var node = $(NodeID);
    var actualDisplay = node.getStyle("display");
    if (actualDisplay == "none")
        node.setStyle("display", "block");
    else
        node.setStyle("display", "none");
}


function setCookie(c_name, value, expiredays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}


function Querystring(qs)
{ // optionally pass a querystring to parse
    this.params = {};

    if (qs == null) qs = location.search.substring(1, location.search.length);
    if (qs.length == 0) return;

    // Turn <plus> back to <space>
    // See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
    qs = qs.replace(/\+/g, ' ');
    var args = qs.split('&'); // parse out name/value pairs separated via &

    // split out each name=value pair
    for (var i = 0; i < args.length; i++)
    {
        var pair = args[i].split('=');
        var name = decodeURIComponent(pair[0]);

        var value = (pair.length == 2)
			? decodeURIComponent(pair[1])
			: name;

        this.params[name] = value;
    }
}

Querystring.prototype.get = function (key, default_)
{
    var value = this.params[key];
    return (value != null) ? value : default_;
}

Querystring.prototype.contains = function (key)
{
    var value = this.params[key];
    return (value != null);
}


