import * as tslib_1 from "tslib";
import styled, { css } from 'styled-components';
import { colors, fontFamily } from '@uidu/theme';
import { borderRadius, size, ellipsis } from '../../mixins';
var wrapperPadding = 8;
export var className = 'media-card-frame';
export var cardShadow = "\n  box-shadow: 0 0 1px 0 rgba(23, 43, 77, 0.24);";
function minWidth(_a) {
    var minWidth = _a.minWidth;
    if (minWidth) {
        return "min-width: " + minWidth + "px;";
    }
    else {
        return '';
    }
}
function maxWidth(_a) {
    var maxWidth = _a.maxWidth;
    if (maxWidth) {
        return "max-width: " + maxWidth + "px;";
    }
    else {
        return '';
    }
}
function interactive(_a) {
    var isInteractive = _a.isInteractive;
    if (isInteractive) {
        return "\n      cursor: pointer;\n      &:hover {\n        background-color: " + colors.N30 + ";\n      }\n      &:active {\n        background-color: " + colors.B50 + ";\n      }\n    ";
    }
    else {
        return '';
    }
}
function selected(_a) {
    var isSelected = _a.isSelected;
    return isSelected
        ? "&::after {\n        cursor: pointer;\n        box-shadow: 0 0 0 2px " + colors.B100 + ";\n        content: '';\n        outline: none;\n        position: absolute;\n        height: 100%;\n        width: 100%;\n        left: 0;\n      }"
        : '';
}
var wrapperStyles = css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", " ", " ", " ", " display: inline-flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  font-family: ", ";\n  padding: 0 ", "px ", "px ", "px;\n  width: 100%;\n  user-select: none;\n  background-color: ", ";\n  line-height: initial;\n  transition: background 0.3s;\n  position: relative;\n  ", "\n"], ["\n  ", " ", " ", " ", " display: inline-flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  font-family: ", ";\n  padding: 0 ", "px ", "px ", "px;\n  width: 100%;\n  user-select: none;\n  background-color: ", ";\n  line-height: initial;\n  transition: background 0.3s;\n  position: relative;\n  ", "\n"])), borderRadius, minWidth, maxWidth, interactive, fontFamily(), wrapperPadding, wrapperPadding, wrapperPadding, colors.N20, selected);
// export interface ContentProps {
//   maxWidth?: number;
// }
export var LinkWrapper = styled.a(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", " &:hover {\n    text-decoration: none;\n  }\n"], ["\n  ", " &:hover {\n    text-decoration: none;\n  }\n"])), wrapperStyles);
export var Wrapper = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), wrapperStyles);
export var Header = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  height: 32px;\n  display: flex;\n  align-items: center;\n  color: ", ";\n"], ["\n  height: 32px;\n  display: flex;\n  align-items: center;\n  color: ", ";\n"])), colors.N300);
export var IconWrapper = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  ", " ", " ", " margin-right: 4px;\n"], ["\n  ", " ", " ",
    " margin-right: 4px;\n"])), borderRadius, size(16), function (_a) {
    var isPlaceholder = _a.isPlaceholder;
    if (isPlaceholder) {
        return "\n      background-color: " + colors.N30 + ";\n    ";
    }
    else {
        return '';
    }
});
export var TextWrapper = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  ", " color: ", ";\n  font-size: 12px;\n  line-height: 16px;\n  ", ";\n"], ["\n  ",
    " color: ", ";\n  font-size: 12px;\n  line-height: 16px;\n  ", ";\n"])), function (_a) {
    var isPlaceholder = _a.isPlaceholder;
    if (isPlaceholder) {
        return "\n        " + borderRadius + "\n        width: 125px;\n        height: 12px;\n        background-color: " + colors.N30 + ";\n      ";
    }
    else {
        return '';
    }
}, colors.N300, ellipsis('none'));
export var Content = styled.div(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  position: relative;\n\n  ", " ", " background-color: white;\n  transition: box-shadow 0.3s;\n\n  ", ";\n"], ["\n  position: relative;\n\n  ", " ", " background-color: white;\n  transition: box-shadow 0.3s;\n\n  ",
    ";\n"])), borderRadius, cardShadow, function (_a) {
    var isInteractive = _a.isInteractive;
    if (isInteractive) {
        return "\n          ." + className + ":hover & {\n            box-shadow: 0 4px 8px -2px rgba(23, 43, 77, 0.32),\n              0 0 1px rgba(23, 43, 77, 0.25);\n          }\n        ";
    }
    else {
        return '';
    }
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
//# sourceMappingURL=styled.js.map