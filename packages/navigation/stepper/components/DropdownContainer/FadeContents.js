import * as tslib_1 from "tslib";
import React, { forwardRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
var getFadeContainerKeyFrame = function (_a) {
    var animatingOut = _a.animatingOut, direction = _a.direction;
    if (!direction)
        return null;
    return keyframes(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  to {\n    transform: translateX(0px);\n    opacity: ", ";\n  }\n"], ["\n  to {\n    transform: translateX(0px);\n    opacity: ", ";\n  }\n"])), animatingOut ? 0 : 1);
};
var getAnimationName = css(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  animation-name: ", ";\n"], ["\n  animation-name: ", ";\n"])), getFadeContainerKeyFrame);
var FadeContainer = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  animation-name: ", ";\n  animation-duration: ", "ms;\n  animation-fill-mode: forwards;\n  opacity: ", ";\n  top: 0;\n  left: 0;\n"], ["\n  animation-name: ", ";\n  animation-duration: ", "ms;\n  animation-fill-mode: forwards;\n  opacity: ", ";\n  top: 0;\n  left: 0;\n"])), getAnimationName, function (props) { return props.duration; }, function (props) { return (props.direction && !props.animatingOut ? 0 : 1); });
var FadeContents = forwardRef(function (_a, ref) {
    var children = _a.children, duration = _a.duration, animatingOut = _a.animatingOut, direction = _a.direction;
    return (React.createElement(FadeContainer
    // prevent screen readers from reading out hidden content
    , { "aria-hidden": animatingOut, animatingOut: animatingOut, direction: direction, duration: duration, ref: ref }, children));
});
export default FadeContents;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=FadeContents.js.map