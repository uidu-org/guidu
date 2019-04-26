export var parseHTML = function (htmlString) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString;
    return wrapper.childNodes[0];
};
//# sourceMappingURL=parseHTML.js.map