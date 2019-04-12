export var containsPixelUnit = function (value) {
    return value.substr(-2) === 'px' && !isNaN(+value.slice(0, -2));
};
//# sourceMappingURL=containsPixelUnit.js.map