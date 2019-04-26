import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import Button from '@uidu/button';
import { toolIcons } from './toolButton';
import { shapeTools } from '../popups/shapePopup';
import { DropdownLeftIconWrapper, DropdownRightIconWrapper } from './styles';
var ShapeButton = /** @class */ (function (_super) {
    tslib_1.__extends(ShapeButton, _super);
    function ShapeButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapeButton.prototype.render = function () {
        var _a = this.props, isActive = _a.isActive, onClick = _a.onClick, activeShape = _a.activeShape;
        var isShapeTool = shapeTools.indexOf(activeShape) > -1;
        var Icon = toolIcons[isShapeTool ? activeShape : shapeTools[0]];
        var iconBefore = (React.createElement(DropdownLeftIconWrapper, null,
            React.createElement(Icon, { label: activeShape, size: "medium" })));
        var iconAfter = (React.createElement(DropdownRightIconWrapper, null,
            React.createElement(ChevronDownIcon, { label: "chevron-icon" })));
        return (React.createElement(Button, { iconBefore: iconBefore, iconAfter: iconAfter, appearance: "subtle", onClick: onClick, isSelected: isActive }));
    };
    return ShapeButton;
}(Component));
export { ShapeButton };
//# sourceMappingURL=shapeButton.js.map