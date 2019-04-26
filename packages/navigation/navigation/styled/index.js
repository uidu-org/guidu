import * as tslib_1 from "tslib";
import styled from 'styled-components';
export var NavigationHeader = styled.li.attrs(function (_a) {
    var className = _a.className;
    return ({
        className: "nav-link" + (className ? " " + className : ''),
    });
})(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  color: #bfc3c6;\n  font-size: 80%;\n  letter-spacing: 0.1rem;\n  text-transform: uppercase;\n"], ["\n  color: #bfc3c6;\n  font-size: 80%;\n  letter-spacing: 0.1rem;\n  text-transform: uppercase;\n"])));
export var NavigationItem = styled.li.attrs(function (_a) {
    var className = _a.className;
    return ({
        className: "nav-item" + (className ? " " + className : ''),
    });
})(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject([""], [""])));
export var NavigationLink = styled.a.attrs(function (_a) {
    var className = _a.className;
    return ({
        className: "nav-link" + (className ? " " + className : ''),
    });
})(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  border-radius: 40px;\n  justify-content: space-between;\n  color: #4c566a !important;\n  transition: background-color linear 300ms;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n\n  &:hover,\n  &.active {\n    background-color: #f3f3f3;\n    color: #4c566a;\n    transition: background-color linear 300ms;\n  }\n"], ["\n  align-items: center;\n  cursor: pointer;\n  display: flex;\n  border-radius: 40px;\n  justify-content: space-between;\n  color: #4c566a !important;\n  transition: background-color linear 300ms;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n\n  &:hover,\n  &.active {\n    background-color: #f3f3f3;\n    color: #4c566a;\n    transition: background-color linear 300ms;\n  }\n"])));
export var FakeGlobalItemWrapper = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n"], ["\n  display: flex;\n  justify-content: center;\n"])));
export var FakeItemWrapper = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  align-items: center;\n  display: flex;\n  flex-shrink: 0;\n  position: relative;\n  color: #f8f9fa;\n\n  &:focus {\n    outline: none;\n  }\n\n  &:hover {\n    text-decoration: none;\n    color: #f8f9fa;\n\n    &:after {\n      content: '';\n      background: rgba(9, 30, 66, 0.42);\n      /* width: 100%; */\n      position: absolute;\n      height: 92%;\n      left: 12px;\n      right: 1rem;\n      border-radius: 40px;\n      z-index: -1;\n    }\n  }\n"], ["\n  align-items: center;\n  display: flex;\n  flex-shrink: 0;\n  position: relative;\n  color: #f8f9fa;\n\n  &:focus {\n    outline: none;\n  }\n\n  &:hover {\n    text-decoration: none;\n    color: #f8f9fa;\n\n    &:after {\n      content: '';\n      background: rgba(9, 30, 66, 0.42);\n      /* width: 100%; */\n      position: absolute;\n      height: 92%;\n      left: 12px;\n      right: 1rem;\n      border-radius: 40px;\n      z-index: -1;\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=index.js.map