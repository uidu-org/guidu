import * as tslib_1 from "tslib";
export var mapAttributesToState = function (_a) {
    var _b = _a.isDisabled, isDisabled = _b === void 0 ? false : _b, _c = _a.isActive, isActive = _c === void 0 ? false : _c, _d = _a.isFocus, isFocus = _d === void 0 ? false : _d, _e = _a.isHover, isHover = _e === void 0 ? false : _e, _f = _a.isSelected, isSelected = _f === void 0 ? false : _f;
    if (isDisabled) {
        return 'disabled';
    }
    if (isSelected && isFocus) {
        return 'focusSelected';
    }
    if (isSelected) {
        return 'selected';
    }
    if (isActive) {
        return 'active';
    }
    if (isHover) {
        return 'hover';
    }
    if (isFocus) {
        return 'focus';
    }
    return 'default';
};
export var filterProps = function (
// @ts-ignore - createAnalyticsEvent is injected from WithAnalyticsEvents HOC
_a, type) {
    var createAnalyticsEvent = _a.createAnalyticsEvent, props = tslib_1.__rest(_a, 
    // @ts-ignore - createAnalyticsEvent is injected from WithAnalyticsEvents HOC
    ["createAnalyticsEvent"]);
    if (type === 'span') {
        var target = props.target, href = props.href, rest = tslib_1.__rest(props, ["target", "href"]);
        return rest;
    }
    return props;
};
export var getLoadingStyle = function (isLoading) { return ({
    transition: 'opacity 0.3s',
    opacity: isLoading ? 0 : 1,
}); };
export var composeRefs = function () {
    var refs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        refs[_i] = arguments[_i];
    }
    return function (x) {
        refs
            .filter(function (r) { return !!r; })
            .forEach(function (ref) {
            if (typeof ref === 'function') {
                ref(x);
            }
            else {
                ref.current = x;
            }
        });
    };
};
/**
 * Convert a hex colour code to RGBA.
 * @param {String} hex Hex colour code.
 * @param {Number} alpha Optional alpha value (defaults to 1).
 */
export function hex2rgba(hex, alpha) {
    if (alpha === void 0) { alpha = 1; }
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        var colorArr = hex.substring(1).split('');
        if (colorArr.length === 3) {
            colorArr = [
                colorArr[0],
                colorArr[0],
                colorArr[1],
                colorArr[1],
                colorArr[2],
                colorArr[2],
            ];
        }
        var color = "0x" + colorArr.join('');
        // FIXME: `>>` operand can validly take a string value
        var r = (color >> 16) & 255;
        var g = (color >> 8) & 255;
        var b = color & 255;
        return "rgba(" + [r, g, b].join(',') + ", " + alpha + ")";
    }
    throw new Error('Bad Hex');
}
//# sourceMappingURL=utils.js.map