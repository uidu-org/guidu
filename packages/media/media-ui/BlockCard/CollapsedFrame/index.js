import * as tslib_1 from "tslib";
import * as React from 'react';
import { Wrappper } from './styled';
var CollapsedFrame = /** @class */ (function (_super) {
    tslib_1.__extends(CollapsedFrame, _super);
    function CollapsedFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var onClick = _this.props.onClick;
            if (onClick) {
                event.preventDefault();
                event.stopPropagation();
                onClick();
            }
        };
        // imitate a button for accessibility reasons
        _this.handleKeyPress = function (event) {
            if (event.key !== ' ' && event.key !== 'Enter') {
                return;
            }
            var onClick = _this.props.onClick;
            if (onClick) {
                event.preventDefault();
                event.stopPropagation();
                onClick();
            }
        };
        return _this;
    }
    CollapsedFrame.prototype.render = function () {
        var _a = this.props, isSelected = _a.isSelected, minWidth = _a.minWidth, maxWidth = _a.maxWidth, children = _a.children, onClick = _a.onClick;
        var isInteractive = Boolean(onClick);
        return (React.createElement(Wrappper, { minWidth: minWidth, maxWidth: maxWidth, isInteractive: isInteractive, isSelected: isSelected, tabIndex: isInteractive ? 0 : undefined, role: isInteractive ? 'button' : undefined, onClick: this.handleClick, onKeyPress: this.handleKeyPress }, children));
    };
    return CollapsedFrame;
}(React.Component));
export { CollapsedFrame };
//# sourceMappingURL=index.js.map