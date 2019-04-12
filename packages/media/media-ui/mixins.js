import * as tslib_1 from "tslib";
import { css, keyframes } from 'styled-components';
import { borderRadius as akBorderRadius } from '@uidu/theme';
export var ellipsis = function (maxWidth) {
    if (maxWidth === void 0) { maxWidth = '100%'; }
    var unit = typeof maxWidth === 'number' ? 'px' : '';
    return css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n    max-width: ", " ", ";\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  "], ["\n    max-width: ", " ", ";\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  "])), maxWidth, unit);
};
export var size = function (value) {
    if (value === void 0) { value = '100%'; }
    var unit = typeof value === 'number' ? 'px' : '';
    return css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    width: ", " ", ";\n    height: ", " ", ";\n  "], ["\n    width: ", " ", ";\n    height: ", " ", ";\n  "])), value, unit, value, unit);
};
export var center = css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
export var absolute = function (top, left) {
    if (top === void 0) { top = 0; }
    if (left === void 0) { left = 0; }
    return css(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n"], ["\n  position: absolute;\n  top: ", "px;\n  left: ", "px;\n"])), top, left);
};
export var borderRadius = css(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  border-radius: ", "px;\n"], ["\n  border-radius: ", "px;\n"])), akBorderRadius());
export var borderRadiusBottom = css(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  border-bottom-left-radius: ", "px;\n  border-bottom-right-radius: ", "px;\n"], ["\n  border-bottom-left-radius: ", "px;\n  border-bottom-right-radius: ", "px;\n"])), akBorderRadius(), akBorderRadius());
export var easeInOutCubic = css(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["cubic-bezier(0.645, 0.045, 0.355, 1)"], ["cubic-bezier(0.645, 0.045, 0.355, 1)"])));
export var fadeInKeyframe = keyframes(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  0%{\n    opacity: 0;\n  }\n\n  100%{\n    opacity: 1;\n  }\n"], ["\n  0%{\n    opacity: 0;\n  }\n\n  100%{\n    opacity: 1;\n  }\n"])));
export var fadeIn = css(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n  animation: ", " 0.3s ", ";\n"], ["\n  animation: ", " 0.3s ", ";\n"])), fadeInKeyframe, easeInOutCubic);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=mixins.js.map