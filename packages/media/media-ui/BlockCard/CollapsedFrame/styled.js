import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { fontFamily, colors } from '@uidu/theme';
import { borderRadius } from '../../mixins';
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
        return "\n      cursor: pointer;\n      :hover {\n        background-color: " + colors.B50 + ";\n      }\n    ";
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
export var Wrappper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  height: 40px;\n  color: ", ";\n  font-family: ", ";\n  font-size: 12px;\n  font-weight: 500;\n  border-radius: 3px;\n  background-color: ", ";\n  position: relative;\n  ", " ", " ", " ", ";\n  ", "\n"], ["\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  height: 40px;\n  color: ", ";\n  font-family: ", ";\n  font-size: 12px;\n  font-weight: 500;\n  border-radius: 3px;\n  background-color: ", ";\n  position: relative;\n  ", " ", " ", " ", ";\n  ", "\n"])), colors.N300, fontFamily, colors.N20A, borderRadius, minWidth, maxWidth, interactive, selected);
export var Icon = styled.span(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: inline-flex;\n"], ["\n  display: inline-flex;\n"])));
export var Text = styled.span(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  margin-left: 12px;\n"], ["\n  margin-left: 12px;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=styled.js.map