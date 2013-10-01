///<reference path="jquery.d.ts"/>
// Module
var TypeScriptTools;
(function (TypeScriptTools) {
    //Class
    var FileTools = (function () {
        function FileTools() {
        }
        FileTools.FileExist = function (path) {
            var result = false;
            jQuery.ajax({
                type: "GET",
                beforeSend: function (request) {
                    request.setRequestHeader("Range", "bytes=0-16");
                },
                url: path,
                cache: false,
                async: false,
                success: function (value) {
                    result = true;
                },
                error: function (msg) {
                    result = false;
                }
            });
            return result;
        };

        FileTools.PathCombine = function (path1, path2) {
            return path1 + path2;
        };

        FileTools.UrlCombine = function (absolteUrl, relativeUrl) {
            return absolteUrl + relativeUrl;
        };

        FileTools.ReadJsonFile = function (path) {
            var queryResult;

            jQuery.ajax({
                type: "GET",
                url: path,
                cache: false,
                async: false,
                success: function (result) {
                    queryResult = result;
                },
                error: function (msg) {
                    queryResult = "ERROR : " + msg;
                }
            });

            return jQuery.parseJSON(queryResult);
        };
        return FileTools;
    })();
    TypeScriptTools.FileTools = FileTools;
})(TypeScriptTools || (TypeScriptTools = {}));
