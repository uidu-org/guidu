import * as tslib_1 from "tslib";
import styled from 'styled-components';
var PLAY_BUTTON_SIZE = 22;
var PROGRESS_BAR_HEIGHT = 2;
var getSize = function (base, size) { return base * (size === 'normal' ? 1 : 1.75); };
export var PlayButton = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  background: #fff;\n  transform: rotate(30deg) skewX(-30deg) scale(1, 0.866);\n  top: calc(50% - 11px);\n  left: calc(50% - 11px);\n  z-index: 2;\n  opacity: ", ";\n  transition: opacity 0.15s ease-in-out;\n\n  &::before,\n  &::after {\n    content: '';\n    position: absolute;\n    background: inherit;\n    left: 0;\n    top: 0;\n  }\n\n  &,\n  &::before,\n  &::after {\n    width: ", "px;\n    height: ", "px;\n    border-top-right-radius: 30%;\n    backface-visibility: hidden;\n  }\n\n  &::before {\n    transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)\n      translate(0, -50%);\n  }\n  &::after {\n    transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);\n  }\n"], ["\n  position: absolute;\n  background: #fff;\n  transform: rotate(30deg) skewX(-30deg) scale(1, 0.866);\n  top: calc(50% - 11px);\n  left: calc(50% - 11px);\n  z-index: 2;\n  opacity: ", ";\n  transition: opacity 0.15s ease-in-out;\n\n  &::before,\n  &::after {\n    content: '';\n    position: absolute;\n    background: inherit;\n    left: 0;\n    top: 0;\n  }\n\n  &,\n  &::before,\n  &::after {\n    width: ", "px;\n    height: ", "px;\n    border-top-right-radius: 30%;\n    backface-visibility: hidden;\n  }\n\n  &::before {\n    transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)\n      translate(0, -50%);\n  }\n  &::after {\n    transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);\n  }\n"])), function (_a) {
    var visible = _a.visible;
    return (visible ? 1 : 0);
}, function (_a) {
    var cardSize = _a.cardSize;
    return getSize(PLAY_BUTTON_SIZE, cardSize);
}, function (_a) {
    var cardSize = _a.cardSize;
    return getSize(PLAY_BUTTON_SIZE, cardSize);
});
export var ProgressBar = styled('div').attrs(function (_a) {
    var playing = _a.playing, progress = _a.progress;
    return ({
        style: {
            width: progress + "%" || 0,
            opacity: playing ? 0.8 : 0,
        },
    });
})(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  background: #e1e8ed;\n  height: ", "px;\n  transition: opacity 0.3s ease-in-out;\n\n  .microlink_card:not(:hover) & {\n    opacity: 0 !important;\n  }\n"], ["\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  background: #e1e8ed;\n  height: ", "px;\n  transition: opacity 0.3s ease-in-out;\n\n  .microlink_card:not(:hover) & {\n    opacity: 0 !important;\n  }\n"])), function (_a) {
    var cardSize = _a.cardSize;
    return getSize(PROGRESS_BAR_HEIGHT, cardSize);
});
var templateObject_1, templateObject_2;
//# sourceMappingURL=controls.js.map