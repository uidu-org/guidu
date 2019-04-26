import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import Button from '@uidu/button';
import { ShapePopupContentWrapper } from './popupStyles';
import { toolIcons } from '../buttons/toolButton';
import { ShapeTitle } from '../buttons/styles';
export var shapeTools = ['rectangle', 'oval', 'line'];
var ShapePopup = /** @class */ (function (_super) {
    tslib_1.__extends(ShapePopup, _super);
    function ShapePopup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapePopup.prototype.render = function () {
        var _a = this.props, isOpen = _a.isOpen, children = _a.children;
        var content = (React.createElement(ShapePopupContentWrapper, null, this.renderButtons()));
        return (React.createElement(InlineDialog, { isOpen: isOpen, placement: "top-start", content: content }, children));
    };
    ShapePopup.prototype.renderButtons = function () {
        var _a = this.props, onPickShape = _a.onPickShape, currentShape = _a.shape;
        return shapeTools.map(function (shape) {
            var isSelected = shape === currentShape;
            var Icon = toolIcons[shape];
            var icon = React.createElement(Icon, { label: shape });
            var onClick = function () { return onPickShape(shape); };
            return (React.createElement(Button, { appearance: "subtle", key: shape, isSelected: isSelected, shouldFitContainer: true, iconBefore: icon, onClick: onClick },
                React.createElement(ShapeTitle, null, shape)));
        });
    };
    return ShapePopup;
}(Component));
export { ShapePopup };
//# sourceMappingURL=shapePopup.js.map