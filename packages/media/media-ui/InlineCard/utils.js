export var truncateUrlForErrorView = function (str, len) {
    if (len === void 0) { len = 40; }
    var clean = str.replace(/https?:\/\//gi, '');
    return clean.length > len - 3 ? clean.substr(0, len) + '...' : clean;
};
//# sourceMappingURL=utils.js.map