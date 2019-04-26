import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
export var checkeredBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAA6hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxOC0xMC0zMFQxMjoxMDo5MjwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+UGl4ZWxtYXRvciAzLjcuNTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpDb21wcmVzc2lvbj4wPC90aWZmOkNvbXByZXNzaW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzI8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4xMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MTA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KX+XPjwAAACtJREFUGBljPHv27H8GNGBsbMyIJsTAhC6Aiz+ACjEcDXIjNg8OoBuJthoAzy0HeT3Qcc0AAAAASUVORK5CYII=';
export var ImagePlacerWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  background-color: ", ";\n  display: inline-block;\n"], ["\n  background-color: ", ";\n  display: inline-block;\n"])), function (props) { return props.backgroundColor; });
export var ImagePlacerErrorWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  background-color: ", ";\n  color: white;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  padding-top: 45%;\n"], ["\n  background-color: ", ";\n  color: white;\n  width: 100%;\n  height: 100%;\n  text-align: center;\n  padding-top: 45%;\n"])), colors.R500);
export var ContainerWrapper = styled.div.attrs({
    style: function (_a) {
        var width = _a.width, height = _a.height, margin = _a.margin;
        return ({
            width: width !== undefined ? width + margin * 2 : 0,
            height: height !== undefined ? height + margin * 2 : 0,
        });
    },
})(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  background: url('", "');\n  position: relative;\n  cursor: move;\n  user-select: none;\n  overflow: hidden;\n"], ["\n  background: url('", "');\n  position: relative;\n  cursor: move;\n  user-select: none;\n  overflow: hidden;\n"])), checkeredBg);
export var EASING = 0.15;
export var ImageWrapper = styled.img.attrs({
    style: function (_a) {
        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        return ({
            left: x,
            top: y,
            width: width,
            height: height,
        });
    },
})(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  transform: ", ";\n  position: absolute;\n  transition: margin-left ", "s ease-out, margin-top ", "s ease-out,\n    left ", "s ease-out, top ", "s ease-out, width ", "s ease-out,\n    height ", "s ease-out;\n  user-select: none;\n  pointer-events: none;\n"], ["\n  transform: ", ";\n  position: absolute;\n  transition: margin-left ", "s ease-out, margin-top ", "s ease-out,\n    left ", "s ease-out, top ", "s ease-out, width ", "s ease-out,\n    height ", "s ease-out;\n  user-select: none;\n  pointer-events: none;\n"])), function (_a) {
    var transform = _a.transform;
    return transform;
}, EASING, EASING, EASING, EASING, EASING, EASING);
export var MarginWrapperSquare = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  border: 1px dotted white;\n  left: 0;\n  top: 0;\n  border-style: solid;\n  border-color: rgba(255, 255, 255, 0.3);\n  border-width: ", "px;\n  width: ", "px;\n  height: ", "px;\n"], ["\n  position: absolute;\n  border: 1px dotted white;\n  left: 0;\n  top: 0;\n  border-style: solid;\n  border-color: rgba(255, 255, 255, 0.3);\n  border-width: ", "px;\n  width: ", "px;\n  height: ", "px;\n"])), function (props) { return props.size; }, function (_a) {
    var width = _a.width;
    return width;
}, function (_a) {
    var height = _a.height;
    return height;
});
export var MarginWrapperCircle = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  overflow: hidden;\n  left: 0px;\n  top: 0px;\n  width: ", "px;\n  height: ", "px;\n\n  &:after {\n    content: '';\n    position: absolute;\n    left: ", "px;\n    top: ", "px;\n    border-radius: 100%;\n    width: ", "px;\n    height: ", "px;\n    box-shadow: 0px 0px 0px ", "px\n      rgba(255, 255, 255, 0.3);\n  }\n"], ["\n  position: absolute;\n  overflow: hidden;\n  left: 0px;\n  top: 0px;\n  width: ", "px;\n  height: ", "px;\n\n  &:after {\n    content: '';\n    position: absolute;\n    left: ", "px;\n    top: ", "px;\n    border-radius: 100%;\n    width: ", "px;\n    height: ", "px;\n    box-shadow: 0px 0px 0px ", "px\n      rgba(255, 255, 255, 0.3);\n  }\n"])), function (_a) {
    var width = _a.width, size = _a.size;
    return width + size * 2;
}, function (_a) {
    var height = _a.height, size = _a.size;
    return height + size * 2;
}, function (_a) {
    var size = _a.size;
    return size;
}, function (_a) {
    var size = _a.size;
    return size;
}, function (_a) {
    var width = _a.width;
    return width;
}, function (_a) {
    var height = _a.height;
    return height;
}, function (_a) {
    var width = _a.width, height = _a.height;
    return Math.max(width, height);
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
//# sourceMappingURL=styled.js.map