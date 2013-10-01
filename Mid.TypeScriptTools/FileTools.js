var MVisionPlayer;
(function (MVisionPlayer) {
    var FileTools = (function () {
        function FileTools() { }
        FileTools.FileExist = function FileExist(path) {
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
        FileTools.PathCombine = function PathCombine(path1, path2) {
            return path1 + path2;
        };
        FileTools.UrlCombine = function UrlCombine(absolteUrl, relativeUrl) {
            return absolteUrl + relativeUrl;
        };
        FileTools.ReadJsonFile = function ReadJsonFile(path) {
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
        FileTools.StartWith = function StartWith(toTest, toSearch) {
            for(var i = 0; i < toSearch.length; i++) {
                if(toSearch.charAt(i) != toTest.charAt(i)) {
                    return false;
                }
            }
            return true;
        };
        FileTools.EndWith = function EndWith(toTest, toSearch) {
            var toTestIndex = toTest.length - 1;
            for(var i = toSearch.length - 1; i >= 0; i--) {
                if(toSearch.charAt(i) != toTest.charAt(toTestIndex)) {
                    return false;
                }
                toTestIndex--;
            }
            return true;
        };
        FileTools.TrimStart = function TrimStart(original, toTrim) {
            var result = original;
            while(this.StartWith(result, toTrim)) {
                result = FileTools.TrimStartOnce(result, toTrim);
            }
            return result;
        };
        FileTools.TrimStartOnce = function TrimStartOnce(original, toTrim) {
            return original.substring(toTrim.length, original.length);
        };
        FileTools.TrimEnd = function TrimEnd(original, toTrim) {
            var result = original;
            while(this.EndWith(result, toTrim)) {
                result = FileTools.TrimEndOnce(result, toTrim);
            }
            return result;
        };
        FileTools.TrimEndOnce = function TrimEndOnce(original, toTrim) {
            return original.substring(0, original.length - toTrim.length);
        };
        return FileTools;
    })();
    MVisionPlayer.FileTools = FileTools;    
})(MVisionPlayer || (MVisionPlayer = {}));
