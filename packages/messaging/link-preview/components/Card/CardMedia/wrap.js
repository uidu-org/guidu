import * as tslib_1 from "tslib";
import styled, { css } from 'styled-components';
import { media, isLarge } from '../../../utils';
import { loadingOverlay } from './loader';
var largeStyle = css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  flex: 1;\n\n  &::before {\n    padding-bottom: 0;\n  }\n"], ["\n  flex: 1;\n\n  &::before {\n    padding-bottom: 0;\n  }\n"])));
var mobileStyle = media.mobile(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  flex: 0 0 92px;\n"], ["\n  flex: 0 0 92px;\n"])));
export default styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  background: #e1e8ed no-repeat center center / cover;\n  display: block;\n  flex: 0 0 125px;\n  overflow: hidden;\n  height: auto;\n  position: relative;\n  transition: flex-basis 0.25s ease-in-out;\n\n  &::before {\n    content: '';\n    padding-bottom: 100%;\n    display: block;\n  }\n\n  ", ";\n  ", ";\n"], ["\n  background: #e1e8ed no-repeat center center / cover;\n  display: block;\n  flex: 0 0 125px;\n  overflow: hidden;\n  height: auto;\n  position: relative;\n  transition: flex-basis 0.25s ease-in-out;\n\n  &::before {\n    content: '';\n    padding-bottom: 100%;\n    display: block;\n  }\n\n  ", ";\n  ", ";\n"])), function (_a) {
    var cardSize = _a.cardSize;
    return (isLarge(cardSize) ? largeStyle : mobileStyle);
}, loadingOverlay);
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=wrap.js.map