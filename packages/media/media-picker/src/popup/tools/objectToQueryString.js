export var objectToQueryString = function (json) {
    return Object.keys(json)
        .map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key].toString());
    })
        .join('&');
};
//# sourceMappingURL=objectToQueryString.js.map