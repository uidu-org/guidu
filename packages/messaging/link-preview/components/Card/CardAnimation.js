import * as tslib_1 from "tslib";
import { css, keyframes } from 'styled-components';
var emptyStatePulse = keyframes(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  0% {\n    background: #e1e8ed;\n  }\n  70% {\n    background: #cdd4d8;\n  }\n  100% {\n    background: #e1e8ed;\n  }\n"], ["\n  0% {\n    background: #e1e8ed;\n  }\n  70% {\n    background: #cdd4d8;\n  }\n  100% {\n    background: #e1e8ed;\n  }\n"])));
var emptyStateImagePulse = keyframes(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  0% {\n    background: #e1e8ed;\n  }\n  70% {\n    background: #dce3e8;\n  }\n  100% {\n    background: #e1e8ed;\n  }\n"], ["\n  0% {\n    background: #e1e8ed;\n  }\n  70% {\n    background: #dce3e8;\n  }\n  100% {\n    background: #e1e8ed;\n  }\n"])));
export var emptyStateAnimation = css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  animation: ", " .75s linear infinite;\n"], ["\n  animation: ", " .75s linear infinite;\n"])), emptyStatePulse);
export var emptyStateImageAnimation = css(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  animation: ", " 1.25s linear infinite;\n"], ["\n  animation: ", " 1.25s linear infinite;\n"])), emptyStateImagePulse);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
//# sourceMappingURL=CardAnimation.js.map