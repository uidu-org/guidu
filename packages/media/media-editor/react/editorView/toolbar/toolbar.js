import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { injectIntl } from 'react-intl';
import Button from '@uidu/button';
import { LineWidthButton } from './buttons/lineWidthButton';
import { ColorButton } from './buttons/colorButton';
import { ToolButton } from './buttons/toolButton';
import { LineWidthPopup } from './popups/lineWidthPopup';
import { ColorPopup } from './popups/colorPopup';
import { ToolbarContainer, CenterButtons, VerticalLine } from './styles';
import { ShapePopup, shapeTools } from './popups/shapePopup';
import { ShapeButton } from './buttons/shapeButton';
import { ButtonGroup } from './buttons/buttonGroup';
import { messages } from '@uidu/media-ui';
export var tools = [
    'arrow',
    'rectangle',
    'oval',
    'line',
    'text',
    'blur',
    'brush',
];
var Toolbar = /** @class */ (function (_super) {
    tslib_1.__extends(Toolbar, _super);
    function Toolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { popup: 'none' };
        _this.onColorButtonClick = function () { return _this.showOrHidePopup('color'); };
        _this.onLineWidthButtonClick = function () { return _this.showOrHidePopup('lineWidth'); };
        _this.onShapeButtonClick = function () { return _this.showOrHidePopup('shape'); };
        _this.onToolClick = function (tool) {
            _this.setState({ popup: 'none' });
            _this.props.onToolChanged(tool);
        };
        return _this;
    }
    Toolbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, color = _a.color, tool = _a.tool, lineWidth = _a.lineWidth, onColorChanged = _a.onColorChanged, onLineWidthChanged = _a.onLineWidthChanged, onSave = _a.onSave, onCancel = _a.onCancel, formatMessage = _a.intl.formatMessage;
        var popup = this.state.popup;
        var showColorPopup = popup === 'color';
        var showLineWidthPopup = popup === 'lineWidth';
        var showShapePopup = popup === 'shape';
        var onPickColor = function (color) {
            onColorChanged(color);
            _this.setState({ popup: 'none' });
        };
        var onLineWidthClick = function (lineWidth) {
            onLineWidthChanged(lineWidth);
            _this.setState({ popup: 'none' });
        };
        var isShapeTool = shapeTools.indexOf(tool) > -1;
        return (React.createElement(ToolbarContainer, null,
            React.createElement(CenterButtons, null,
                React.createElement(ButtonGroup, null,
                    this.renderSimpleTool('arrow'),
                    this.renderSimpleTool('text'),
                    React.createElement(ShapePopup, { isOpen: showShapePopup, shape: tool, onPickShape: this.onToolClick },
                        React.createElement("div", null,
                            React.createElement(ShapeButton, { onClick: this.onShapeButtonClick, isActive: isShapeTool, activeShape: tool }))),
                    this.renderSimpleTool('brush'),
                    this.renderSimpleTool('blur'),
                    React.createElement(VerticalLine, null),
                    React.createElement(LineWidthPopup, { onLineWidthClick: onLineWidthClick, lineWidth: lineWidth, isOpen: showLineWidthPopup },
                        React.createElement("div", null,
                            React.createElement(LineWidthButton, { lineWidth: lineWidth, isActive: showLineWidthPopup, onClick: this.onLineWidthButtonClick }))),
                    React.createElement(ColorPopup, { onPickColor: onPickColor, color: color, isOpen: showColorPopup },
                        React.createElement("div", null,
                            React.createElement(ColorButton, { color: color, isActive: showColorPopup, onClick: this.onColorButtonClick }))),
                    React.createElement(VerticalLine, null),
                    React.createElement(Button, { appearance: "primary", theme: "dark", onClick: onSave }, formatMessage(messages.save)),
                    React.createElement(Button, { appearance: "subtle", onClick: onCancel, theme: "dark" }, formatMessage(messages.cancel))))));
    };
    Toolbar.prototype.renderSimpleTool = function (tool) {
        var activeTool = this.props.tool;
        return (React.createElement(ToolButton, { key: tool, tool: tool, activeTool: activeTool, onToolClick: this.onToolClick }));
    };
    Toolbar.prototype.showOrHidePopup = function (target) {
        if (this.state.popup === target) {
            this.setState({ popup: 'none' });
        }
        else {
            this.setState({ popup: target });
        }
    };
    return Toolbar;
}(Component));
export { Toolbar };
export default injectIntl(Toolbar);
//# sourceMappingURL=toolbar.js.map