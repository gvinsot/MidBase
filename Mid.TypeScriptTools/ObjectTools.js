var MVisionPlayer;
(function (MVisionPlayer) {
    var JavascriptTools = (function () {
        function JavascriptTools() { }
        JavascriptTools.CheckFileAPI = function CheckFileAPI() {
            if(window["File"] && window["FileReader"] && window["FileList"] && window["Blob"] && JavascriptTools.supportsH264Video()) {
                return true;
            } else {
                alert('The File APIs are not fully supported in this browser.');
                return false;
            }
        };
        JavascriptTools.supportsH264Video = function supportsH264Video() {
            var v = document.createElement("video");
            var result = v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
            return result.length != 0;
        };
        JavascriptTools.ConvertJsonToDate = function ConvertJsonToDate(sourceString) {
            var trimed = MVisionPlayer.FileTools.TrimStart(sourceString, "/Date(");
            trimed = MVisionPlayer.FileTools.TrimEnd(trimed, ")/");
            trimed = MVisionPlayer.FileTools.TrimEnd(trimed, "+0000");
            return new Date(parseInt(trimed));
        };
        JavascriptTools.ConvertJsonTimeSpanToDate = function ConvertJsonTimeSpanToDate(sourceString) {
            var trimed = MVisionPlayer.FileTools.TrimStart(sourceString, "PT");
            var hours = 0;
            var minutes = 0;
            var seconds = 0;
            var splitted = trimed.split("H");
            if(splitted.length > 1) {
                hours = parseInt(splitted[0]);
                trimed = splitted[1];
            }
            splitted = trimed.split("M");
            if(splitted.length > 1) {
                minutes = parseInt(splitted[0]);
                trimed = splitted[1];
            }
            trimed = MVisionPlayer.FileTools.TrimEnd(trimed, "S");
            seconds = parseInt(trimed);
            return new Date(hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000);
        };
        JavascriptTools.Any = function Any(list, condition) {
            var currentIndex = 0;
            var currentItem;
            do {
                currentItem = list[currentIndex];
                if(condition(currentItem) == true) {
                    return true;
                }
                currentIndex++;
            }while(currentItem != null);
            return false;
        };
        JavascriptTools.Count = function Count(list, condition) {
            var currentIndex = 0;
            var result = 0;
            var currentItem;
            do {
                currentItem = list[currentIndex];
                if(condition(currentItem) == true) {
                    result++;
                }
                currentIndex++;
            }while(currentItem != null);
            return result;
        };
        JavascriptTools.DeleteNode = function DeleteNode(node) {
            if(node) {
                JavascriptTools.DeleteChildren(node);
                if(node.parentNode) {
                    node.parentNode.removeChild(node);
                }
                delete node;
            }
        };
        JavascriptTools.DeleteChildren = function DeleteChildren(node) {
            if(node) {
                for(var x = node.childNodes.length - 1; x >= 0; x--) {
                    var childNode = node.childNodes[x];
                    if(childNode.hasChildNodes()) {
                        JavascriptTools.DeleteChildren(childNode);
                    }
                    node.removeChild(childNode);
                    delete childNode;
                }
            }
        };
        return JavascriptTools;
    })();
    MVisionPlayer.JavascriptTools = JavascriptTools;    
})(MVisionPlayer || (MVisionPlayer = {}));
