import * as tslib_1 from "tslib";
import styled, { css } from 'styled-components';
var mobileOnlyHeight = function (fixedHeight) {
    if (fixedHeight === 'mobileOnly') {
        return css(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n      @media (max-width: 700px) {\n        height: 100vh;\n      }\n      height: auto;\n    "], ["\n      @media (max-width: 700px) {\n        height: 100vh;\n      }\n      height: auto;\n    "])));
    }
    if (fixedHeight) {
        return css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n      height: 100vh;\n    "], ["\n      height: 100vh;\n    "])));
    }
    return css(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n    height: auto;\n  "], ["\n    height: auto;\n  "])));
};
var mobileOnlyScrollable = function (scrollable) {
    if (scrollable === 'mobileOnly') {
        return css(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n      @media (max-width: 700px) {\n        overflow-y: scroll;\n      }\n    "], ["\n      @media (max-width: 700px) {\n        overflow-y: scroll;\n      }\n    "])));
    }
    if (scrollable) {
        return css(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n      overflow-y: scroll;\n    "], ["\n      overflow-y: scroll;\n    "])));
    }
    return css(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject([""], [""])));
};
export var Wrapper = styled.div(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  display: flex;\n\n  ", ";\n  width: 100%;\n"], ["\n  display: flex;\n\n  ", ";\n  width: 100%;\n"])), function (_a) {
    var fixedHeight = _a.fixedHeight;
    return mobileOnlyHeight(fixedHeight);
});
export var Sidebar = styled.aside(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  flex-direction: column;\n  flex-shrink: 0;\n  justify-content: space-between;\n"], ["\n  flex-direction: column;\n  flex-shrink: 0;\n  justify-content: space-between;\n"])));
export var Navigation = styled.aside(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n  flex-direction: column;\n  justify-content: space-between;\n"], ["\n  flex-direction: column;\n  justify-content: space-between;\n"])));
export var Content = styled.main(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  width: 100%;\n"], ["\n  display: flex;\n  width: 100%;\n"])));
export var Main = styled.main(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  width: 100%;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  width: 100%;\n"])));
export var Header = styled.header(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  height: 4.5rem;\n  flex-shrink: 0;\n"], ["\n  display: flex;\n  align-items: center;\n  height: 4.5rem;\n  flex-shrink: 0;\n"])));
export var Body = styled.div(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n  flex: 1 1 auto;\n  ", ";\n"], ["\n  flex: 1 1 auto;\n  ", ";\n"])), function (_a) {
    var scrollable = _a.scrollable;
    return mobileOnlyScrollable(scrollable);
});
export var Footer = styled.footer(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n  // height: 3rem;\n  flex-shrink: 0;\n"], ["\n  // height: 3rem;\n  flex-shrink: 0;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
//# sourceMappingURL=index.js.map