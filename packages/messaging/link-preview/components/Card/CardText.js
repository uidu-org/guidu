import * as tslib_1 from "tslib";
import React from 'react';
import styled from 'styled-components';
import NanoClamp from 'nanoclamp';
var Clamp = function (_a) {
    var children = _a.children, className = _a.className, lines = _a.lines;
    return (React.createElement(NanoClamp, { className: className, lines: lines, text: children, is: "p" }));
};
var CardText = styled(Clamp)(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  &&& {\n    text-align: inherit;\n    font-weight: inherit;\n    font-family: inherit;\n    color: inherit;\n    margin: 0;\n  }\n"], ["\n  &&& {\n    text-align: inherit;\n    font-weight: inherit;\n    font-family: inherit;\n    color: inherit;\n    margin: 0;\n  }\n"])));
export default CardText;
var templateObject_1;
//# sourceMappingURL=CardText.js.map