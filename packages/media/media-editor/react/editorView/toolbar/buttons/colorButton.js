import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Button from '@uidu/button';
import { ColorSample, DropdownRightIconWrapper, DropdownLeftIconWrapper, } from './styles';
var ColorButton = /** @class */ (function (_super) {
    tslib_1.__extends(ColorButton, _super);
    function ColorButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColorButton.prototype.render = function () {
        var _a = this.props, color = _a.color, isActive = _a.isActive, onClick = _a.onClick;
        var red = color.red, green = color.green, blue = color.blue;
        var style = { backgroundColor: "rgb(" + red + ", " + green + ", " + blue + ")" };
        var iconBefore = (React.createElement(DropdownLeftIconWrapper, null,
            React.createElement(ColorSample, { style: style })));
        var iconAfter = (React.createElement(DropdownRightIconWrapper, null,
            React.createElement(ChevronDownIcon, { label: "chevron-icon" })));
        return (React.createElement(Button, { iconBefore: iconBefore, iconAfter: iconAfter, appearance: "subtle", onClick: onClick, isSelected: isActive }));
    };
    return ColorButton;
}(Component));
export { ColorButton };
//# sourceMappingURL=colorButton.js.map