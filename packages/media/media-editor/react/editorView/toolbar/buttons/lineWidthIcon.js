import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { FrontArea, MainArea } from './lineWidthButtonStyles';
var LineWidthIcon = /** @class */ (function (_super) {
    tslib_1.__extends(LineWidthIcon, _super);
    function LineWidthIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineWidthIcon.prototype.render = function () {
        var _a = this.props, lineWidth = _a.lineWidth, isActive = _a.isActive, onLineWidthClick = _a.onLineWidthClick;
        var onClick = function () { return onLineWidthClick(lineWidth); };
        var map = {
            4: 4,
            8: 6,
            12: 10,
            16: 12,
            20: 16,
        };
        var style = {
            width: map[lineWidth] + "px",
            height: map[lineWidth] + "px",
            borderRadius: map[lineWidth] * 2 + "px",
        };
        var mainAreaStyle = {
            padding: (18 - map[lineWidth]) / 2 + "px",
        };
        return (React.createElement(MainArea, { onClick: onClick, isActive: isActive, style: mainAreaStyle },
            React.createElement(FrontArea, { style: style, isActive: isActive })));
    };
    return LineWidthIcon;
}(Component));
export { LineWidthIcon };
//# sourceMappingURL=lineWidthIcon.js.map