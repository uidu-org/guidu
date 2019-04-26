import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { layers, colors } from '@uidu/theme';
export var blanketColor = colors.N700A;
var overlayZindex = layers.modal() + 10;
export var MediaEditorContainer = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 0;\n"], ["\n  position: absolute;\n  top: 0;\n"])));
MediaEditorContainer.displayName = 'MediaEditorContainer';
export var OutputArea = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  overflow: hidden;\n"], ["\n  position: absolute;\n  overflow: hidden;\n"])));
OutputArea.displayName = 'OutputArea';
export var DrawingCanvas = styled.canvas(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  left: 0;\n  top: 0;\n"], ["\n  position: absolute;\n  left: 0;\n  top: 0;\n"])));
DrawingCanvas.displayName = 'DrawingCanvas';
export var SupplementaryCanvas = styled.canvas(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  display: none;\n  left: 0;\n  top: 0;\n"], ["\n  position: absolute;\n  display: none;\n  left: 0;\n  top: 0;\n"])));
SupplementaryCanvas.displayName = 'SupplementaryCanvas';
// TODO Check with transparent canvas, because DefaultKeyboardInput makes the text area visible to get focus.
// https://jira.atlassian.com/browse/FIL-4059
export var HiddenTextArea = styled.textarea(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  display: block;\n  visibility: hidden; /* display:none won't allow to get the keyboard focus */\n  left: 0;\n  top: 0;\n  width: 0;\n  height: 0;\n  overflow: hidden;\n  resize: none;\n  opacity: 0;\n"], ["\n  position: absolute;\n  display: block;\n  visibility: hidden; /* display:none won't allow to get the keyboard focus */\n  left: 0;\n  top: 0;\n  width: 0;\n  height: 0;\n  overflow: hidden;\n  resize: none;\n  opacity: 0;\n"])));
HiddenTextArea.displayName = 'HiddenTextArea';
export var HiddenTextHelperDiv = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  display: block;\n  visibility: hidden; /* display:none won't allow us to call getClientBoundingRect() for children */\n  left: 0;\n  top: 0;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  white-space: pre; /* to preserve multiple whitespace characters and not to break lines */\n"], ["\n  position: absolute;\n  display: block;\n  visibility: hidden; /* display:none won't allow us to call getClientBoundingRect() for children */\n  left: 0;\n  top: 0;\n  width: 100px;\n  height: 100px;\n  overflow: hidden;\n  white-space: pre; /* to preserve multiple whitespace characters and not to break lines */\n"])));
HiddenTextHelperDiv.displayName = 'HiddenTextHelperDiv';
export var ToolbarContainer = styled.div(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  width: 32px;\n  height: 392px;\n  background-color: ", ";\n  border-radius: 4px;\n  padding: 8px;\n"], ["\n  width: 32px;\n  height: 392px;\n  background-color: ", ";\n  border-radius: 4px;\n  padding: 8px;\n"])), colors.N600A);
ToolbarContainer.displayName = 'ToolbarContainer';
export var ToolbarButton = styled.div(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  background-color: ", ";\n  border-radius: 4px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"], ["\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  background-color: ",
    ";\n  border-radius: 4px;\n\n  &:hover {\n    background-color: ", ";\n  }\n"])), function (props) {
    return props.selected ? colors.N90 : 'transparent';
}, colors.N90);
ToolbarButton.displayName = 'ToolbarButton';
export var ColorSquare = styled.div(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n  width: 20px;\n  height: 20px;\n  margin: 4px;\n  background-color: ", ";\n  border-radius: 4px;\n  border-width: 2px;\n  border-color: ", ";\n  border-style: solid;\n"], ["\n  width: 20px;\n  height: 20px;\n  margin: 4px;\n  background-color: ", ";\n  border-radius: 4px;\n  border-width: 2px;\n  border-color: ", ";\n  border-style: solid;\n"])), function (props) { return props.color || 'transparent'; }, colors.N50A);
ColorSquare.displayName = 'ColorSquare';
export var LineWidthBackCircle = styled.div(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin: 6px;\n  background-color: ", ";\n  border-radius: 10px;\n"], ["\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  margin: 6px;\n  background-color: ", ";\n  border-radius: 10px;\n"])), colors.N200);
LineWidthBackCircle.displayName = 'LineWidthBackCircle';
export var LineWidthFrontCircle = styled.div(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n  width: ", ";\n  height: ", ";\n  background-color: ", ";\n  border-radius: 50%;\n  margin: ", ";\n"], ["\n  width: ",
    ";\n  height: ",
    ";\n  background-color: ", ";\n  border-radius: 50%;\n  margin: ",
    ";\n"])), function (props) {
    return props.width ? props.width + "px" : '0';
}, function (props) {
    return props.width ? props.width + "px" : '0';
}, colors.N40, function (props) {
    return props.width ? 10 - props.width / 2 + "px" : '0';
});
LineWidthFrontCircle.displayName = 'LineWidthFrontCircle';
export var ToolIcon = styled.div(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n  width: 20px;\n  height: 20px;\n  margin: 4px;\n  color: ", ";\n"], ["\n  width: 20px;\n  height: 20px;\n  margin: 4px;\n  color: ", ";\n"])), colors.N40);
ToolIcon.displayName = 'ToolIcon';
// TODO This is copy paste from media-viewer
export var Blanket = styled.div(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: ", ";\n  z-index: ", ";\n"], ["\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: ", ";\n  z-index: ", ";\n"])), blanketColor, overlayZindex);
Blanket.displayName = 'Blanket';
export var SpinnerWrapper = styled.div(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"], ["\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"])));
SpinnerWrapper.displayName = 'SpinnerWrapper';
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14;
//# sourceMappingURL=styled.js.map