/* tslint:disable:variable-name */
import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
export var Wrapper = styled.li(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  color: ", ";\n  padding: 6px 25px;\n  list-style-type: none;\n  opacity: 1;\n\n  ", ";\n  &:hover {\n    ", ";\n  }\n"], ["\n  color: ",
    ";\n  padding: 6px 25px;\n  list-style-type: none;\n  opacity: 1;\n\n  ", ";\n  &:hover {\n    ",
    ";\n  }\n"])), function (_a) {
    var isActive = _a.isActive;
    return isActive ? colors.B400 : colors.N500;
}, function (_a) {
    var isActive = _a.isActive;
    return (isActive ? '' : 'cursor: pointer');
}, function (_a) {
    var isActive = _a.isActive;
    return isActive ? '' : 'background-color: #E5E8EC';
});
export var ServiceIcon = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  vertical-align: middle;\n"], ["\n  display: inline-block;\n  vertical-align: middle;\n"])));
export var ServiceName = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  font-size: 14px;\n  position: relative;\n  margin-left: 10px;\n  top: -1px;\n  display: inline-block;\n"], ["\n  font-size: 14px;\n  position: relative;\n  margin-left: 10px;\n  top: -1px;\n  display: inline-block;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=styled.js.map