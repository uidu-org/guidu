import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { borderRadius } from '@uidu/theme';
import { getCSSUnitValue } from '../utils/getCSSUnitValue';
import { breakpointStyles } from '../utils/breakpoint';
import { getSelectedBorderStyle } from '../styles/getSelectedBorderStyle';
var getWrapperHeight = function (dimensions) {
    return dimensions && dimensions.height
        ? "height: " + getCSSUnitValue(dimensions.height) + "; max-height: 100%;"
        : '';
};
var getWrapperWidth = function (dimensions) {
    return dimensions && dimensions.width
        ? "width: " + getCSSUnitValue(dimensions.width) + "; max-width: 100%;"
        : '';
};
export var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ",
    ";\n"])), function (_a) {
    var dimensions = _a.dimensions, _b = _a.breakpointSize, breakpointSize = _b === void 0 ? 'medium' : _b, shouldUsePointerCursor = _a.shouldUsePointerCursor;
    return "\n      " + breakpointStyles({ breakpointSize: breakpointSize }) + "\n      " + getWrapperHeight(dimensions) + "\n      " + getWrapperWidth(dimensions) + "\n      cursor: " + (shouldUsePointerCursor ? 'pointer' : 'default') + ";\n    ";
});
Wrapper.displayName = 'CardViewWrapper';
export var InlinePlayerWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  overflow: hidden;\n  border-radius: ", ";\n  position: relative;\n\n  max-width: 100%;\n  max-height: 100%;\n\n  ", "\n\n  video {\n    width: 100%;\n    height: 100%;\n  }\n"], ["\n  overflow: hidden;\n  border-radius: ", ";\n  position: relative;\n\n  max-width: 100%;\n  max-height: 100%;\n\n  ", "\n\n  video {\n    width: 100%;\n    height: 100%;\n  }\n"])), borderRadius(), getSelectedBorderStyle);
InlinePlayerWrapper.displayName = 'InlinePlayerWrapper';
var templateObject_1, templateObject_2;
//# sourceMappingURL=styled.js.map