/* tslint:disable:variable-name */
import { borderRadius } from '@uidu/theme';
import { defaultTransitionDuration } from './config';
export var centerX = "\n  display: flex;\n  justify-content: center;\n";
export var antialiased = "\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n";
export var centerSelfY = "\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n";
export var centerSelfX = "\n  position: absolute;\n  left: 50%;\n  transform: translateX(-50%);\n";
export var centerSelf = "\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n";
export var borderRadiusLeft = "\n  border-top-left-radius: " + borderRadius() + ";\n  border-bottom-left-radius: " + borderRadius() + ";\n";
export var spaceAround = "\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n";
export var transition = function (propertyName) {
    if (propertyName === void 0) { propertyName = 'all'; }
    return "\n  transition: " + propertyName + " " + defaultTransitionDuration + ";\n";
};
export var hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? parseInt(result[1], 16) + "," + parseInt(result[2], 16) + "," + parseInt(result[3], 16)
        : null;
};
export var rgba = function (hex, opacity) {
    return "rgba(" + hexToRgb(hex) + ", " + opacity + ")";
};
export var capitalize = "\n  &::first-letter {\n    text-transform: uppercase;\n  }\n";
export var withAppearance = function (styleMap) { return function (_a) {
    var appearance = _a.appearance;
    return (appearance && styleMap[appearance]) || '';
}; };
//# sourceMappingURL=mixins.js.map