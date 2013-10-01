String.prototype.StartWith = function (stringToTest) {
    for(var i = 0; i < stringToTest.length; i++) {
        if(stringToTest.charAt(i) != this.charAt(i)) {
            return false;
        }
    }
    return true;
};
String.prototype.EndWith = function (stringToTest) {
    for(var i = stringToTest.length - 1; i >= 0; i--) {
        if(stringToTest.charAt(i) != this.charAt(i)) {
            return false;
        }
    }
    return true;
};
String.prototype.TrimStart = function (toTrim) {
    var result = toTrim;
    while(this.StartWith(toTrim)) {
        result = result.TrimStartOnce(toTrim);
    }
    return result;
};
String.prototype.TrimEnd = function (toTrim) {
    var result = toTrim;
    while(this.EndWith(toTrim)) {
        result = result.TrimEndOnce(toTrim);
    }
    return result;
};
String.prototype.TrimEndOnce = function (toTrim) {
    return this.substring(0, this.length - toTrim.length);
};
String.prototype.TrimStartOnce = function (toTrim) {
    return this.substring(toTrim.length, this.length);
};
