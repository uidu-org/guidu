var capitalize = function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
};
export var vendorify = function (propName, capitalizeText) {
    if (capitalizeText === void 0) { capitalizeText = true; }
    var prefix = '';
    if (HTMLElement.prototype.webkitRequestFullscreen) {
        prefix = 'webkit';
    }
    else if (HTMLElement.prototype['mozRequestFullScreen']) {
        prefix = 'moz';
    }
    else if (HTMLElement.prototype['msRequestFullScreen']) {
        prefix = 'ms';
    }
    var capitalizeProp = capitalizeText !== undefined ? capitalizeText : !!prefix;
    return "" + prefix + (capitalizeProp ? capitalize(propName) : propName);
};
export var requestFullscreen = function (element) {
    var methodName = vendorify('requestFullScreen');
    if (methodName && element[methodName]) {
        element[methodName]();
    }
};
export var exitFullscreen = function () {
    var methodName = vendorify('exitFullscreen');
    if (methodName && document[methodName]) {
        document[methodName]();
    }
};
export var getFullscreenElement = function () {
    var propertyName = vendorify('fullscreenElement');
    return propertyName && document[propertyName];
};
export var toggleFullscreen = function (element) {
    if (getFullscreenElement()) {
        exitFullscreen();
    }
    else if (element) {
        requestFullscreen(element);
    }
};
//# sourceMappingURL=fullscreen.js.map