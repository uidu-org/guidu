import * as tslib_1 from "tslib";
import styled, { css } from 'styled-components';
export var ImageLoadCatcher = styled.img(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  height: 1px;\n  width: 1px;\n  position: absolute;\n  z-index: -1;\n"], ["\n  height: 1px;\n  width: 1px;\n  position: absolute;\n  z-index: -1;\n"])));
export var loadingOverlay = css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  &::after {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    background: #e1e8ed;\n    transition: opacity 0.3s ease-out;\n    opacity: ", ";\n    z-index: 1;\n  }\n"], ["\n  &::after {\n    content: '';\n    position: absolute;\n    left: 0;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    background: #e1e8ed;\n    transition: opacity 0.3s ease-out;\n    opacity: ", ";\n    z-index: 1;\n  }\n"])), function (_a) {
    var loading = _a.loading;
    return (loading ? 1 : 0);
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=loader.js.map