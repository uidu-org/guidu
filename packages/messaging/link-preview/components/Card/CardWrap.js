import * as tslib_1 from "tslib";
import { createElement } from 'react';
import styled, { css } from 'styled-components';
import { media, isLarge } from '../../utils';
var HEIGHT = '382px';
var contrastStyle = function (_a) {
    var backgroundColor = _a.backgroundColor, color = _a.color;
    return css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  background-color: ", ";\n  border-color: ", ";\n  transition-property: filter;\n\n  &&& {\n    color: ", ";\n  }\n\n  &:hover {\n    filter: brightness(90%);\n  }\n"], ["\n  background-color: ", ";\n  border-color: ", ";\n  transition-property: filter;\n\n  &&& {\n    color: ", ";\n  }\n\n  &:hover {\n    filter: brightness(90%);\n  }\n"])), backgroundColor, color, color);
};
var largeStyle = css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  flex-direction: column;\n  height: ", ";\n  transition-property: background, border-color, height;\n\n  ", ";\n"], ["\n  flex-direction: column;\n  height: ", ";\n  transition-property: background, border-color, height;\n\n  ",
    ";\n"])), HEIGHT, media.mobile(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    height: calc(", " * 7/9);\n  "], ["\n    height: calc(", " * 7/9);\n  "])), HEIGHT));
var hoverStyle = css(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  transition-property: background, border-color;\n  &:hover {\n    background: #f5f8fa;\n    ", "\n  }\n"], ["\n  transition-property: background, border-color;\n  &:hover {\n    background: #f5f8fa;\n    ", /* border-color: rgba(136, 153, 166, 0.5); */ "\n  }\n"])), '' /* border-color: rgba(136, 153, 166, 0.5); */);
var rtlStyle = function (_a) {
    var cardSize = _a.cardSize;
    return css(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  flex-direction: ", ";\n"], ["\n  flex-direction: ", ";\n"])), isLarge(cardSize) ? 'column-reverse' : 'row-reverse');
};
var baseStyle = css(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  background-color: #fff;\n  overflow: hidden;\n  color: #181919;\n  display: flex;\n  text-decoration: none;\n  opacity: 1;\n  position: relative;\n\n  transition-duration: 0.15s;\n  transition-timing-function: ease-in-out;\n\n  &:active,\n  &:hover {\n    color: #181919;\n    text-decoration: none;\n    outline: 0;\n  }\n"], ["\n  background-color: #fff;\n  overflow: hidden;\n  color: #181919;\n  display: flex;\n  text-decoration: none;\n  opacity: 1;\n  position: relative;\n\n  transition-duration: 0.15s;\n  transition-timing-function: ease-in-out;\n\n  &:active,\n  &:hover {\n    color: #181919;\n    text-decoration: none;\n    outline: 0;\n  }\n"])));
var createEl = function (_a) {
    var as = _a.as;
    return styled(as)(baseStyle, function (_a) {
        var loading = _a.loading, contrast = _a.contrast;
        return !loading && !contrast && hoverStyle;
    }, function (_a) {
        var cardSize = _a.cardSize;
        return isLarge(cardSize) && largeStyle;
    }, function (_a) {
        var direction = _a.direction;
        return direction === 'rtl' && rtlStyle;
    }, function (_a) {
        var backgroundColor = _a.backgroundColor, color = _a.color, contrast = _a.contrast;
        return contrast && color && backgroundColor && contrastStyle;
    }, function (_a) {
        var backgroundColor = _a.backgroundColor, color = _a.color, contrast = _a.contrast;
        return contrast && (!color || !backgroundColor) && hoverStyle;
    });
};
var CACHE = {};
var CardWrap = function (_a) {
    var rel = _a.rel, href = _a.href, target = _a.target, props = tslib_1.__rest(_a, ["rel", "href", "target"]);
    var key = JSON.stringify(tslib_1.__assign({}, props, { children: undefined }));
    return createElement(CACHE[key] || (CACHE[key] = createEl({ as: props.as })), props.as === 'a' ? tslib_1.__assign({ href: href, rel: rel, target: target }, props) : props);
};
CardWrap.defaultProps = {
    as: 'a',
    rel: 'noopener noreferrer',
    target: '_blank',
};
export default CardWrap;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=CardWrap.js.map