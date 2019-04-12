/* tslint:disable:variable-name */
import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { fontFamily } from '@uidu/theme';
import { fadeIn } from '@uidu/media-ui';
export * from './config';
export * from './mixins';
export * from './easing';
export * from './animations';
export var Root = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  box-sizing: border-box;\n  font-family: ", ";\n\n  * {\n    box-sizing: border-box;\n  }\n"], ["\n  box-sizing: border-box;\n  font-family: ", ";\n\n  * {\n    box-sizing: border-box;\n  }\n"])), fontFamily());
export var cardShadow = "\n  box-shadow: 0 1px 1px rgba(9, 30, 66, 0.2), 0 0 1px 0 rgba(9, 30, 66, 0.24);\n";
export var FadeinImage = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), fadeIn);
export default Root;
var templateObject_1, templateObject_2;
//# sourceMappingURL=index.js.map