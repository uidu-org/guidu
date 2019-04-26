import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import CheckIcon from '@atlaskit/icon/glyph/check';
import { ColorSample, CheckArea } from './colorButtonStyles';
var ColorButton = /** @class */ (function (_super) {
    tslib_1.__extends(ColorButton, _super);
    function ColorButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorButton.prototype.render = function () {
        var _a = this.props, color = _a.color, onColorClick = _a.onClick;
        var red = color.red, green = color.green, blue = color.blue;
        var onClick = function () { return onColorClick(color); };
        var style = {
            backgroundColor: "rgb(" + red + ", " + green + ", " + blue + ")",
        };
        return (React.createElement(ColorSample, { style: style, onClick: onClick }, this.checkMark()));
    };
    ColorButton.prototype.checkMark = function () {
        var _a = this.props, color = _a.color, currentColor = _a.currentColor;
        if (color.red === currentColor.red &&
            color.green === currentColor.green &&
            color.blue === currentColor.blue) {
            return (React.createElement(CheckArea, null,
                React.createElement(CheckIcon, { label: "check", size: "medium" })));
        }
        return null;
    };
    return ColorButton;
}(Component));
export { ColorButton };
//# sourceMappingURL=colorButton.js.map