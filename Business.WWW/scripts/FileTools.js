///<reference path="libs/jquery.d.ts"/>
// Module
var SilverScriptTools;
(function (SilverScriptTools) {
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
                dataType: 'json',
                success: function (result) {
                    queryResult = result;
                },
                error: function (msg) {
                    //queryResult = "ERROR : " + msg;
                    throw new Error(msg.statusText);
                }
            });
            return queryResult; //jQuery.parseJSON(queryResult);
        };
        FileTools.ReadHtmlFile = function (path) {
            var queryResult;
            jQuery.ajax({
                type: "GET",
                url: path,
                async: false,
                dataType: 'html',
                success: function (result) {
                    queryResult = result;
                },
                error: function (msg) {
                    //queryResult = "ERROR : " + msg;
                    throw new Error(msg.statusText);
                }
            });
            return queryResult; //jQuery.parseJSON(queryResult);
        };
        return FileTools;
    })();
    SilverScriptTools.FileTools = FileTools;
})(SilverScriptTools || (SilverScriptTools = {}));
//# sourceMappingURL=FileTools.js.map