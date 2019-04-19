import * as tslib_1 from "tslib";
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { emptyStateAnimation, emptyStateImageAnimation } from './CardAnimation';
import CardImage from './CardMedia/Image';
import { Content } from './CardContent';
import { media } from '../../utils';
var MediaEmpty = styled(CardImage)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), emptyStateImageAnimation);
var HeaderEmpty = styled.header(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  height: 16px;\n  width: 60%;\n  display: block;\n  background: #e1e8ed;\n  margin: 2px 0 8px;\n  opacity: 0.8;\n  ", ";\n"], ["\n  height: 16px;\n  width: 60%;\n  display: block;\n  background: #e1e8ed;\n  margin: 2px 0 8px;\n  opacity: 0.8;\n  ", ";\n"])), emptyStateAnimation);
var DescriptionEmpty = styled.span(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  width: 95%;\n  display: block;\n  background: #e1e8ed;\n  margin-bottom: 12px;\n  opacity: 0.8;\n  position: relative;\n  ", " animation-delay: .125s;\n\n  height: 33px;\n\n  &::before {\n    content: '';\n    position: absolute;\n    left: -1px;\n    right: -1px;\n    height: 6px;\n    background: #fff;\n  }\n\n  &::before {\n    top: 14px;\n  }\n\n  &::after {\n    bottom: 14px;\n  }\n\n  ", ";\n"], ["\n  width: 95%;\n  display: block;\n  background: #e1e8ed;\n  margin-bottom: 12px;\n  opacity: 0.8;\n  position: relative;\n  ", " animation-delay: .125s;\n\n  height: 33px;\n\n  &::before {\n    content: '';\n    position: absolute;\n    left: -1px;\n    right: -1px;\n    height: 6px;\n    background: #fff;\n  }\n\n  &::before {\n    top: 14px;\n  }\n\n  &::after {\n    bottom: 14px;\n  }\n\n  ",
    ";\n"])), emptyStateAnimation, function (_a) {
    var cardSize = _a.cardSize;
    return cardSize !== 'large' && media.mobile(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    height: 14px;\n  "], ["\n    height: 14px;\n  "])));
});
var FooterEmpty = styled.footer(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  height: 10px;\n  width: 30%;\n  display: block;\n  background: #e1e8ed;\n  opacity: 0.8;\n  ", " animation-delay: .25s;\n"], ["\n  height: 10px;\n  width: 30%;\n  display: block;\n  background: #e1e8ed;\n  opacity: 0.8;\n  ", " animation-delay: .25s;\n"])), emptyStateAnimation);
var CardEmptyState = function (_a) {
    var cardSize = _a.cardSize;
    return (React.createElement(Fragment, null,
        React.createElement(MediaEmpty, { cardSize: cardSize }),
        React.createElement(Content, { cardSize: cardSize },
            React.createElement(HeaderEmpty, null),
            React.createElement(DescriptionEmpty, { cardSize: cardSize }),
            React.createElement(FooterEmpty, null))));
};
export default CardEmptyState;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=CardEmpty.js.map