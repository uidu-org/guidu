// tslint:disable:variable-name
import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
export var Container = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 32px;\n  height: 32px;\n  padding: 1px;\n  box-sizing: border-box;\n"], ["\n  width: 32px;\n  height: 32px;\n  padding: 1px;\n  box-sizing: border-box;\n"])));
export var HoverArea = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  box-sizing: border-box;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  padding: 1px;\n  border: 2px solid transparent;\n  &:hover {\n    border: 2px solid ", ";\n  }\n"], ["\n  box-sizing: border-box;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  padding: 1px;\n  border: 2px solid transparent;\n  &:hover {\n    border: 2px solid ", ";\n  }\n"])), colors.N30A);
export var MainArea = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  box-sizing: border-box;\n  width: 24px;\n  height: 24px;\n  border-radius: 15px;\n  background-color: ", ";\n"], ["\n  box-sizing: border-box;\n  width: 24px;\n  height: 24px;\n  border-radius: 15px;\n  background-color: ",
    ";\n"])), function (props) {
    return props.isSelected ? colors.N500 : colors.N30A;
});
export var FrontArea = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  box-sizing: border-box;\n  background-color: ", ";\n"], ["\n  box-sizing: border-box;\n  background-color: ",
    ";\n"])), function (props) {
    return props.isSelected ? colors.N0 : colors.N500;
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=lineWidthButtonStyles.js.map