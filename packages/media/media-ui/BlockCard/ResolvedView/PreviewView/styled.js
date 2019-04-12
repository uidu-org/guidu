import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
import { fadeIn } from '../../../mixins';
var borderRadius = "border-radius: 3px 3px 0 0;";
export var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: relative;\n  height: 0;\n  padding-bottom: 56.25%;\n  color: ", ";\n  ", " background-color: ", ";\n  ", ";\n"], ["\n  position: relative;\n  height: 0;\n  padding-bottom: 56.25%;\n  color: ", ";\n  ", " background-color: ", ";\n  ", ";\n"])), colors.N40A, borderRadius, colors.N30, fadeIn);
export var IconWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"], ["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"])));
export var ImageWrapper = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  ", " ", ";\n"], ["\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  ", " ",
    ";\n"])), borderRadius, function (_a) {
    var url = _a.url;
    return "\n    background-image: url(" + url + ");\n    background-repeat: no-repeat, repeat;\n    background-position: center, center;\n    background-size: cover, auto;\n  ";
});
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=styled.js.map