import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import InlineDialog from '@atlaskit/inline-dialog';
import { LineWidthPopupContainer } from './popupStyles';
import { LineWidthIcon } from './lineWidthIcon';
var LineWidthPopup = /** @class */ (function (_super) {
    tslib_1.__extends(LineWidthPopup, _super);
    function LineWidthPopup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineWidthPopup.prototype.render = function () {
        var _a = this.props, isOpen = _a.isOpen, children = _a.children;
        var content = (React.createElement(LineWidthPopupContainer, null, this.buttons()));
        return (React.createElement(InlineDialog, { isOpen: isOpen, placement: "top-start", content: content }, children));
    };
    LineWidthPopup.prototype.buttons = function () {
        var _a = this.props, onLineWidthClick = _a.onLineWidthClick, currentLineWidth = _a.lineWidth;
        var lineWidths = [4, 8, 12, 16, 20];
        return lineWidths.map(function (lineWidth) { return (React.createElement(LineWidthIcon, { key: "" + lineWidth, lineWidth: lineWidth, currentLineWidth: currentLineWidth, onLineWidthClick: onLineWidthClick })); });
    };
    return LineWidthPopup;
}(Component));
export { LineWidthPopup };
//# sourceMappingURL=lineWidthPopup.js.map