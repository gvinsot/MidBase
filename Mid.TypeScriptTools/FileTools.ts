///<reference path="jquery.d.ts"/>
// Module
module TypeScriptTools
{

        //Class
    export class FileTools
    {
        public static FileExist(path: string): boolean
        {
            var result: boolean = false;
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

        public static PathCombine(path1: string, path2:string): string
        {
            return path1+path2;
        }

        public static UrlCombine(absolteUrl: string, relativeUrl:string): string
        {
            return absolteUrl+relativeUrl;
        }

        public static ReadJsonFile(path: string): Object
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


    }
}
