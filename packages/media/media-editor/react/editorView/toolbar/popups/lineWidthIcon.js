import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { Container, HoverArea, MainArea, FrontArea, } from './lineWidthButtonStyles';
var LineWidthIcon = /** @class */ (function (_super) {
    tslib_1.__extends(LineWidthIcon, _super);
    function LineWidthIcon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineWidthIcon.prototype.render = function () {
        var _a = this.props, lineWidth = _a.lineWidth, currentLineWidth = _a.currentLineWidth, onLineWidthClick = _a.onLineWidthClick;
        var onClick = function () { return onLineWidthClick(lineWidth); };
        var isSelected = lineWidth === currentLineWidth;
        var style = {
            width: lineWidth + "px",
            height: lineWidth + "px",
            borderRadius: lineWidth + "px",
        };
        var mainAreaStyle = {
            padding: (24 - lineWidth) / 2 + "px",
        };
        return (React.createElement(Container, { onClick: onClick },
            React.createElement(HoverArea, null,
                React.createElement(MainArea, { isSelected: isSelected, style: mainAreaStyle },
                    React.createElement(FrontArea, { style: style, isSelected: isSelected })))));
    };
    return LineWidthIcon;
}(Component));
export { LineWidthIcon };
//# sourceMappingURL=lineWidthIcon.js.map