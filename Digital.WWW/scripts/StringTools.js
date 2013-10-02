$.extend(String.prototype, {
    StartWith: function (stringToTest) {
        return TypeScriptTools.StringTools.StartWith(this, stringToTest);
    }
});
$.extend(String.prototype, {
    EndWith: function (stringToTest) {
        return TypeScriptTools.StringTools.EndWith(this, stringToTest);
    }
});
$.extend(String.prototype, {
    TrimStart: function (toTrim) {
        return TypeScriptTools.StringTools.TrimStart(this, toTrim);
    }
});
$.extend(String.prototype, {
    TrimEnd: function (toTrim) {
        return TypeScriptTools.StringTools.TrimEnd(this, toTrim);
    }
});
$.extend(String.prototype, {
    TrimEndOnce: function (toTrim) {
        return TypeScriptTools.StringTools.TrimEndOnce(this, toTrim);
    }
});
$.extend(String.prototype, {
    TrimStartOnce: function (toTrim) {
        return TypeScriptTools.StringTools.TrimStartOnce(this, toTrim);
    }
});
var TypeScriptTools;
(function (TypeScriptTools) {
    var StringTools = (function () {
        function StringTools() { }
        StringTools.StartWith = function StartWith(toTest, toSearch) {
            for(var i = 0; i < toSearch.length; i++) {
                if(toSearch.charAt(i) != toTest.charAt(i)) {
                    return false;
                }
            }
            return true;
        };
        StringTools.EndWith = function EndWith(toTest, toSearch) {
            var toTestIndex = toTest.length - 1;
            for(var i = toSearch.length - 1; i >= 0; i--) {
                if(toSearch.charAt(i) != toTest.charAt(toTestIndex)) {
                    return false;
                }
                toTestIndex--;
            }
            return true;
        };
        StringTools.TrimStart = function TrimStart(original, toTrim) {
            var result = original;
            while(this.StartWith(result, toTrim)) {
                result = StringTools.TrimStartOnce(result, toTrim);
            }
            return result;
        };
        StringTools.TrimStartOnce = function TrimStartOnce(original, toTrim) {
            return original.substring(toTrim.length, original.length);
        };
        StringTools.TrimEnd = function TrimEnd(original, toTrim) {
            var result = original;
            while(this.EndWith(result, toTrim)) {
                result = StringTools.TrimEndOnce(result, toTrim);
            }
            return result;
        };
        StringTools.TrimEndOnce = function TrimEndOnce(original, toTrim) {
            return original.substring(0, original.length - toTrim.length);
        };
        return StringTools;
    })();
    TypeScriptTools.StringTools = StringTools;    
})(TypeScriptTools || (TypeScriptTools = {}));
