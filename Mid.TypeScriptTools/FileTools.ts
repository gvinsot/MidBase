///<reference path="jquery.d.ts"/>
// Module
module TypeScriptTools
{

        //Class
    export class FileTools
    {
        static FileExist(path: string): bool
        {
            var result: bool = false;
            jQuery.ajax(
            {
                type: "GET",
                beforeSend: function (request)
                {
                    request.setRequestHeader("Range", "bytes=0-16");
                },
                url: path,
                cache: false,
                async: false,
                success: function (value)
                {
                    result = true;
                },
                error: function (msg)
                {
                    result = false;
                }
            });
            return result;
        }

        static PathCombine(path1: string, path2:string): string
        {
            return path1+path2;
        }

        static UrlCombine(absolteUrl: string, relativeUrl:string): string
        {
            return absolteUrl+relativeUrl;
        }

        static ReadJsonFile(path: string): Object
        {
            var queryResult: string;

            jQuery.ajax(
            {
                type: "GET",
                url: path,
                cache: false,
                async: false,
                success: function (result)
                {
                    queryResult = result;
                },
                error: function (msg)
                {
                    queryResult = "ERROR : " + msg;
                }
            });

            return jQuery.parseJSON(queryResult);
        }



        static StartWith (toTest:string, toSearch:string):bool
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

        static EndWith(toTest: string, toSearch: string):bool
        {
            var toTestIndex = toTest.length - 1;
            for (var i = toSearch.length - 1; i >= 0 ; i--)
            {
                if (toSearch.charAt(i) != toTest.charAt(toTestIndex))
                {
                    return false;
                }
                toTestIndex--;
            }
            return true;
        }

        static TrimStart (original:string, toTrim:string):string
        {
            var result = original;
            while (this.StartWith(result,toTrim))
            {
                result = FileTools.TrimStartOnce(result,toTrim);
            }
            return result;
        };

        private static TrimStartOnce(original:string,toTrim:string):string
        {
            return original.substring(toTrim.length, original.length);
        };

        static TrimEnd(original: string, toTrim: string): string
        {
            var result = original;
            while (this.EndWith(result,toTrim))
            {
                result = FileTools.TrimEndOnce(result,toTrim);
            }
            return result;
        };

         private static TrimEndOnce(original: string, toTrim: string): string
        {
            return original.substring(0, original.length - toTrim.length);
        };
    }
}
