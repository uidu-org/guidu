/* tslint:disable:variable-name */
import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
var typeToColorMap = {
    image: colors.Y200,
    audio: colors.P200,
    video: '#ff7143',
    doc: colors.B300,
    unknown: '#3dc7dc',
};
export var IconWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  display: inline-flex;\n  color: ", ";\n"], ["\n  display: inline-flex;\n  color: ",
    ";\n"])), function (_a) {
    var type = _a.type;
    return typeToColorMap[type] || typeToColorMap.unknown;
});
var templateObject_1;
//# sourceMappingURL=styled.js.map