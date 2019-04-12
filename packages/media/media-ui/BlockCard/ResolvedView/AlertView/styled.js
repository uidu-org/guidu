import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
import { borderRadiusBottom } from '../../../mixins';
export var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding: 7px 4px;\n  font-size: 14px;\n  font-weight: 500;\n  text-align: center;\n  line-height: 18px;\n  pointer-events: all;\n  ", " ", ";\n"], ["\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  padding: 7px 4px;\n  font-size: 14px;\n  font-weight: 500;\n  text-align: center;\n  line-height: 18px;\n  pointer-events: all;\n  ", " ",
    ";\n"])), borderRadiusBottom, function (_a) {
    var type = _a.type;
    if (type === 'failure') {
        return "\n        color: " + colors.N600 + ";\n        background-color: " + colors.Y300 + ";\n      ";
    }
    else {
        return "\n        color: " + colors.N0 + ";\n        background-color: " + colors.G300 + ";\n      ";
    }
});
var templateObject_1;
//# sourceMappingURL=styled.js.map