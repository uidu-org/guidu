import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
import { borderRadius as akBorderRadius } from '@uidu/theme';
var selected = "\n  cursor: pointer;\n  box-shadow: 0 0 0 2px " + colors.B100 + ";\n  outline: none;\n  &, :hover, :focus, :active {\n    text-decoration: none;\n  }\n";
var isInteractive = function (_a) {
    var isInteractive = _a.isInteractive;
    if (isInteractive) {
        return "\n      cursor: pointer;\n      :hover {\n        background-color: " + colors.N40A + ";\n        text-decoration: none;\n      }\n      :active {\n        background-color: " + colors.B50 + ";\n        text-decoration: none;\n      }\n      :focus {\n        " + selected + "\n        text-decoration: none;\n      }\n    ";
    }
    else {
        return '';
    }
};
var background = function (_a) {
    var withoutBackground = _a.withoutBackground;
    return withoutBackground ? "" : "background-color: " + colors.N30A + ";";
};
var isSelected = function (_a) {
    var isSelected = _a.isSelected;
    if (isSelected) {
        return selected;
    }
    else {
        return '';
    }
};
export var Wrapper = styled.a(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  line-height: ", ";\n  margin: 0px 2px;\n  padding: 2px;\n  border-radius: ", "px;\n  user-select: none;\n  ", ";\n  ", "\n  ", ";\n"], ["\n  line-height: ", ";\n  margin: 0px 2px;\n  padding: 2px;\n  border-radius: ", "px;\n  user-select: none;\n  ", ";\n  ", "\n  ", ";\n"])), 16 / 14, akBorderRadius(), background, isInteractive, isSelected);
var templateObject_1;
//# sourceMappingURL=styled.js.map