import * as tslib_1 from "tslib";
import * as React from 'react';
import { ToolbarContainer } from './styled';
import { ColorButton, LineWidthButton, ToolButton } from './toolbarButtons';
import { colorSame } from '../util';
var red = { red: 250, green: 61, blue: 17 };
var green = { red: 65, green: 224, blue: 138 };
var yellow = { red: 249, green: 182, blue: 0 };
var blue = { red: 34, green: 98, blue: 255 };
var Toolbar = /** @class */ (function (_super) {
    tslib_1.__extends(Toolbar, _super);
    function Toolbar(props) {
        return _super.call(this, props) || this;
    }
    Toolbar.prototype.render = function () {
        return (React.createElement(ToolbarContainer, null,
            this.createColorButton(red),
            this.createColorButton(green),
            this.createColorButton(yellow),
            this.createColorButton(blue),
            this.createLineWidthButton(8),
            this.createLineWidthButton(10),
            this.createLineWidthButton(12),
            this.createToolButton('brush'),
            this.createToolButton('arrow'),
            this.createToolButton('line'),
            this.createToolButton('text')));
    };
    Toolbar.prototype.createColorButton = function (color) {
        var _this = this;
        return (React.createElement(ColorButton, { color: color, selected: colorSame(this.props.color, color), 
            // tslint:disable-next-line:jsx-no-lambda
            onClick: function () { return _this.props.onColorChanged(color); } }));
    };
    Toolbar.prototype.createLineWidthButton = function (lineWidth) {
        var _this = this;
        return (React.createElement(LineWidthButton, { lineWidth: lineWidth, selected: this.props.lineWidth === lineWidth, 
            // tslint:disable-next-line:jsx-no-lambda
            onClick: function () { return _this.props.onLineWidthChanged(lineWidth); } }));
    };
    Toolbar.prototype.createToolButton = function (tool) {
        var _this = this;
        return (React.createElement(ToolButton, { tool: tool, selected: this.props.tool === tool, 
            // tslint:disable-next-line:jsx-no-lambda
            onClick: function () { return _this.props.onToolChanged(tool); } }));
    };
    return Toolbar;
}(React.Component));
export { Toolbar };
//# sourceMappingURL=toolbar.js.map