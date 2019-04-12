export var isIE = function (navigator) {
    if (navigator === void 0) { navigator = window.navigator; }
    return (navigator.userAgent.indexOf('MSIE') !== -1 ||
        navigator.appVersion.indexOf('Trident/') > 0);
};
//# sourceMappingURL=isIE.js.map