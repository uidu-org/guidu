import * as tslib_1 from "tslib";
/* tslint:disable:variable-name */
import styled, { keyframes } from 'styled-components';
import { center } from '@uidu/media-ui';
import { colors, themed } from '@uidu/theme';
export var blinkLoadingAnimation = keyframes(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  0%{\n    opacity: 1;\n  }\n\n  50%{\n    opacity: 0.6;\n  }\n\n  100%{\n    opacity: 1;\n  }\n"], ["\n  0%{\n    opacity: 1;\n  }\n\n  50%{\n    opacity: 0.6;\n  }\n\n  100%{\n    opacity: 1;\n  }\n"])));
export var Wrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", " background: ", ";\n  color: ", ";\n  border-radius: inherit;\n  max-height: 100%;\n  max-width: 100%;\n\n  ", "\n  > span {\n    animation: ", " 0.8s infinite;\n  }\n"], ["\n  ", " background: ", ";\n  color: ", ";\n  border-radius: inherit;\n  max-height: 100%;\n  max-width: 100%;\n\n  ",
    "\n  > span {\n    animation: ", " 0.8s infinite;\n  }\n"])), center, themed({ light: colors.N20, dark: colors.DN50 }), themed({ light: colors.N50, dark: colors.DN100 }), function (props) {
    return "\n      width: " + props.dimensions.width + ";\n      height: " + props.dimensions.height + ";\n    ";
}, blinkLoadingAnimation);
var templateObject_1, templateObject_2;
//# sourceMappingURL=styled.js.map