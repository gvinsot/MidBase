/// <reference path="jquery.d.ts" />


interface String {
    StartWith: (stringToTest : string) => bool;
    EndWith: (stringToTest : string) => bool;
    TrimStart: (toTrim: string) => string;
    TrimEnd: (toTrim: string) =>string;
    TrimStartOnce: (toTrim: string) => string;
    TrimEndOnce: (toTrim: string) =>string;
}

String.prototype.StartWith = function (stringToTest : string) : bool
{
    for(var i=0;i<stringToTest.length;i++)
    {
        if(stringToTest.charAt(i) !=this.charAt(i))
        {
            return false;
        }
    }
    return true;
};

String.prototype.EndWith = function (stringToTest : string) : bool
{
    for (var i = stringToTest.length - 1; i >= 0 ; i--)
    {
        if (stringToTest.charAt(i) != this.charAt(i))
        {
            return false;
        }
    }
    return true;
};

String.prototype.TrimStart = function (toTrim : string):string
{    
    var result = toTrim;    
    while (this.StartWith(toTrim))
    {
        result = result.TrimStartOnce(toTrim);
    }
    return result;   
};


String.prototype.TrimEnd = function (toTrim:string):string
{
    var result = toTrim;
    while (this.EndWith(toTrim))
    {
        result = result.TrimEndOnce(toTrim);
    }
    return result;
};


String.prototype.TrimEndOnce = function (toTrim:string):string
{
    return this.substring(0, this.length - toTrim.length);
};


String.prototype.TrimStartOnce = function (toTrim:string):string
{
    return this.substring(toTrim.length, this.length);
};
