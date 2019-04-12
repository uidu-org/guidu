import * as tslib_1 from "tslib";
/* tslint:disable:variable-name */
import * as React from 'react';
import styled from 'styled-components';
import * as exenv from 'exenv';
var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  ", ";\n"], ["\n  ", ";\n"])), function (_a) {
    var inline = _a.inline;
    return (inline && 'display: inline;') || '';
});
Wrapper.displayName = 'Ellipsify';
export var Ellipsify = function (props) {
    return (React.createElement(Wrapper, { className: "ellipsed-text", ref: setEllipsis(props), "aria-label": props.text, inline: props.inline }, props.text));
};
var setEllipsis = function (props) { return function (element) {
    if (!element) {
        return;
    }
    var maximumLines = props.lines;
    var height = element.getBoundingClientRect().height;
    var text = element.textContent;
    element.textContent = 'a';
    var lineHeight = element.getBoundingClientRect().height;
    var lineCount = height / lineHeight;
    var maximumHeight = lineHeight * maximumLines;
    if (lineCount <= maximumLines) {
        element.textContent = text;
        return;
    }
    var textContent = text;
    var endLength = typeof props.endLength === 'number' && props.endLength >= 0
        ? props.endLength
        : 8;
    var beginningText = text.substr(0, (text.length * maximumLines) / lineCount - endLength);
    var endText = text.substr(text.length - endLength, endLength);
    element.textContent = textContent = beginningText + "..." + endText;
    var finalHeight = element.getBoundingClientRect().height;
    if (finalHeight > maximumHeight) {
        var adjustedBeginningText = beginningText.substr(0, beginningText.length - (beginningText.length / maximumLines) * 0.25);
        textContent = adjustedBeginningText + "..." + endText;
    }
    delayRun(function () { return (element.textContent = textContent); });
}; };
var timeout = function (fn) { return setTimeout(fn, 1); };
var delayRun = exenv.canUseDOM && window.requestAnimationFrame
    ? window.requestAnimationFrame
    : timeout;
export default Ellipsify;
var templateObject_1;
//# sourceMappingURL=ellipsify.js.map