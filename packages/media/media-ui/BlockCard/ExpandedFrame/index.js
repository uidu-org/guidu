import * as tslib_1 from "tslib";
import * as React from 'react';
import { className, LinkWrapper, Wrapper, Header, IconWrapper, TextWrapper, Content, } from './styled';
var ExpandedFrame = /** @class */ (function (_super) {
    tslib_1.__extends(ExpandedFrame, _super);
    function ExpandedFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            var onClick = _this.props.onClick;
            if (onClick) {
                event.preventDefault();
                event.stopPropagation();
                onClick();
            }
        };
        return _this;
    }
    Object.defineProperty(ExpandedFrame.prototype, "isInteractive", {
        get: function () {
            var _a = this.props, isPlaceholder = _a.isPlaceholder, href = _a.href, onClick = _a.onClick;
            return !isPlaceholder && (Boolean(href) || Boolean(onClick));
        },
        enumerable: true,
        configurable: true
    });
    ExpandedFrame.prototype.renderHeader = function () {
        var _a = this.props, _b = _a.isPlaceholder, isPlaceholder = _b === void 0 ? false : _b, icon = _a.icon, text = _a.text;
        return (React.createElement(Header, null,
            React.createElement(IconWrapper, { isPlaceholder: isPlaceholder }, !isPlaceholder && icon),
            React.createElement(TextWrapper, { isPlaceholder: isPlaceholder }, !isPlaceholder && text)));
    };
    ExpandedFrame.prototype.renderContent = function () {
        var isInteractive = this.isInteractive;
        var children = this.props.children;
        return React.createElement(Content, { isInteractive: isInteractive }, children);
    };
    ExpandedFrame.prototype.render = function () {
        var isInteractive = this.isInteractive;
        var _a = this.props, isPlaceholder = _a.isPlaceholder, isSelected = _a.isSelected, href = _a.href, minWidth = _a.minWidth, maxWidth = _a.maxWidth;
        if (!isPlaceholder && href) {
            return (React.createElement(LinkWrapper, { target: "_blank", rel: "noopener", className: className, isInteractive: isInteractive, isSelected: isSelected, href: href, minWidth: minWidth, maxWidth: maxWidth, onClick: this.handleClick },
                this.renderHeader(),
                this.renderContent()));
        }
        else {
            return (React.createElement(Wrapper, { className: className, isInteractive: isInteractive, isSelected: isSelected, minWidth: minWidth, maxWidth: maxWidth, onClick: this.handleClick },
                this.renderHeader(),
                this.renderContent()));
        }
    };
    return ExpandedFrame;
}(React.Component));
export { ExpandedFrame };
//# sourceMappingURL=index.js.map