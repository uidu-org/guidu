/* global URL */
import * as tslib_1 from "tslib";
import React from 'react';
import styled, { css } from 'styled-components';
import CardText from './CardText';
import { media, imageProxy } from '../../utils';
var REGEX_STRIP_WWW = /^www\./;
var getHostname = function (href) {
    var hostname = new URL(href).hostname;
    return hostname.replace(REGEX_STRIP_WWW, '');
};
var isLarge = function (cardSize) { return cardSize === 'large'; };
var largeContentStyle = css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  flex: 0 0 125px;\n"], ["\n  flex: 0 0 125px;\n"])));
var mobileDescriptionStyle = css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ",
    ";\n"])), media.mobile(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n    > p {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n  "], ["\n    > p {\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n  "]))));
export var Content = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: space-around;\n  flex-direction: column;\n  flex: 1;\n  padding: 10px 15px;\n  min-width: 0;\n  box-sizing: border-box;\n  ", ";\n"], ["\n  display: flex;\n  justify-content: space-around;\n  flex-direction: column;\n  flex: 1;\n  padding: 10px 15px;\n  min-width: 0;\n  box-sizing: border-box;\n  ", ";\n"])), function (_a) {
    var cardSize = _a.cardSize;
    return isLarge(cardSize) && largeContentStyle;
});
var Header = styled.header(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  text-align: left;\n  font-size: 16px;\n  font-weight: bold;\n  margin: 0;\n  flex-grow: 1.2;\n"], ["\n  text-align: left;\n  font-size: 16px;\n  font-weight: bold;\n  margin: 0;\n  flex-grow: 1.2;\n"])));
var Description = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  text-align: left;\n  font-size: 14px;\n  flex-grow: 2;\n  margin: auto 0;\n  ", "\n  ", ";\n"], ["\n  text-align: left;\n  font-size: 14px;\n  flex-grow: 2;\n  margin: auto 0;\n  ", /* line-height: 18px; */ "\n  ", ";\n"])), '' /* line-height: 18px; */, function (_a) {
    var cardSize = _a.cardSize;
    return !isLarge(cardSize) && mobileDescriptionStyle;
});
var Footer = styled.footer(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  text-align: left;\n  font-size: 12px;\n  margin: 0;\n  flex-grow: 0;\n"], ["\n  align-items: center;\n  display: flex;\n  text-align: left;\n  font-size: 12px;\n  margin: 0;\n  flex-grow: 0;\n"])));
var Logo = styled.div(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  background-image: ", ";\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n  height: 14px;\n  width: 14px;\n  margin-right: 0.25rem;\n"], ["\n  background-image: ", ";\n  background-size: cover;\n  background-position: center center;\n  background-repeat: no-repeat;\n  height: 14px;\n  width: 14px;\n  margin-right: 0.25rem;\n"])), function (_a) {
    var logo = _a.logo;
    return "url('" + imageProxy(logo) + "')";
});
export default (function (_a) {
    var title = _a.title, description = _a.description, url = _a.url, cardSize = _a.cardSize, className = _a.className, logo = _a.logo;
    return (React.createElement(Content, { className: className, cardSize: cardSize },
        React.createElement(Header, null,
            React.createElement(CardText, { lines: 1 }, title)),
        React.createElement(Description, { cardSize: cardSize },
            React.createElement(CardText, { lines: 2 }, description)),
        React.createElement(Footer, null,
            logo && React.createElement(Logo, { className: "rounded", logo: logo }),
            React.createElement(CardText, { lines: 1 }, url && getHostname(url)))));
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;
//# sourceMappingURL=CardContent.js.map