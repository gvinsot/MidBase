/// <reference path="jquery.d.ts" />


interface String {
    StartWith: (stringToTest : string) => boolean;
    EndWith: (stringToTest : string) => boolean;
    TrimStart: (toTrim: string) => string;
    TrimEnd: (toTrim: string) =>string;
    TrimStartOnce: (toTrim: string) => string;
    TrimEndOnce: (toTrim: string) =>string;
}

$.extend(String.prototype, {
    StartWith: function (stringToTest: string): boolean
    {
        return TypeScriptTools.StringTools.StartWith(this, stringToTest);
    }
});

$.extend(String.prototype, {
    EndWith: function (stringToTest: string): boolean
    {
        return TypeScriptTools.StringTools.EndWith(this, stringToTest);
    }
});

$.extend(String.prototype, {
    TrimStart: function (toTrim: string): string
    {
        return TypeScriptTools.StringTools.TrimStart(this, toTrim);
    }
});

$.extend(String.prototype, {
    TrimEnd: function (toTrim: string): string
    {
        return TypeScriptTools.StringTools.TrimEnd(this, toTrim);
    }
});

$.extend(String.prototype, {
    TrimEndOnce: function (toTrim: string): string
    {
        return TypeScriptTools.StringTools.TrimEndOnce(this, toTrim);
    }
});

$.extend(String.prototype, {
    TrimStartOnce: function (toTrim: string): string
    {
        return TypeScriptTools.StringTools.TrimStartOnce(this, toTrim);
    }
});


module TypeScriptTools
{
    export class StringTools
    {


        public static StartWith(toTest: string, toSearch: string): boolean
        {
            for (var i = 0; i < toSearch.length; i++)
            {
                if (toSearch.charAt(i) != toTest.charAt(i))
                {
                    return false;
                }
            }
            return true;
        }

        public static EndWith(toTest: string, toSearch: string): boolean
        {
            var toTestIndex = toTest.length - 1;
            for (var i = toSearch.length - 1; i >= 0; i--)
            {
                if (toSearch.charAt(i) != toTest.charAt(toTestIndex))
                {
                    return false;
                }
                toTestIndex--;
            }
            return true;
        }

        public static TrimStart(original: string, toTrim: string): string
        {
            var result = original;
            while (this.StartWith(result, toTrim))
            {
                result = StringTools.TrimStartOnce(result, toTrim);
            }
            return result;
        }

        public static TrimStartOnce(original: string, toTrim: string): string
        {
            return original.substring(toTrim.length, original.length);
        }

        public static TrimEnd(original: string, toTrim: string): string
        {
            var result = original;
            while (this.EndWith(result, toTrim))
            {
                result = StringTools.TrimEndOnce(result, toTrim);
            }
            return result;
        }

        public static TrimEndOnce(original: string, toTrim: string): string
        {
            return original.substring(0, original.length - toTrim.length);
        }
    }
}