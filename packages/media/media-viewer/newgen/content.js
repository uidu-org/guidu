import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Button from '@uidu/button';
import { closeOnDirectClick } from './utils/closeOnDirectClick';
import { ContentWrapper, CloseButtonWrapper, hideControlsClassName, } from './styled';
var mouseMovementDelay = 2000;
export var findParent = function (element, className, maxParentElement) {
    if (maxParentElement === void 0) { maxParentElement = document.body; }
    if (element.classList.contains(className)) {
        return element;
    }
    var currentElement = element;
    while (currentElement.parentElement !== maxParentElement) {
        if (currentElement.parentElement) {
            currentElement = currentElement.parentElement;
            if (currentElement.classList.contains(className)) {
                return currentElement;
            }
        }
        else {
            return undefined;
        }
    }
    return undefined;
};
var Content = /** @class */ (function (_super) {
    tslib_1.__extends(Content, _super);
    function Content() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showControls: true,
        };
        _this.clearTimeout = function () {
            if (_this.checkActivityTimeout) {
                window.clearTimeout(_this.checkActivityTimeout);
            }
        };
        _this.hideControls = function (element) { return function () {
            if (element) {
                var parent_1 = findParent(element, hideControlsClassName, _this.contentWrapperElement);
                if (!parent_1) {
                    _this.setState({ showControls: false });
                }
            }
            else {
                _this.setState({ showControls: false });
            }
        }; };
        _this.checkMouseMovement = function (e) {
            var showControls = _this.state.showControls;
            _this.clearTimeout();
            // This check is needed to not trigger a render call on every movement.
            // Even if nothing will be re-renderer since the value is the same, it
            // will go into any children render method for nothing.
            if (!showControls) {
                _this.setState({ showControls: true });
            }
            _this.checkActivityTimeout = window.setTimeout(_this.hideControls(e && e.target), mouseMovementDelay);
        };
        // We want to check mouse movement on click too
        // in order to not hide controls when user is interacting with any control
        _this.onClick = function (e) {
            var onClose = _this.props.onClose;
            _this.checkMouseMovement();
            closeOnDirectClick(onClose)(e);
        };
        _this.saveContentWrapperRef = function (el) {
            _this.contentWrapperElement = el;
        };
        return _this;
    }
    Content.prototype.componentDidMount = function () {
        this.checkMouseMovement();
    };
    Content.prototype.componentWillUnmount = function () {
        this.clearTimeout();
    };
    Content.prototype.render = function () {
        var showControls = this.state.showControls;
        var onClose = this.props.onClose;
        // We extend the children with the ability of showing the controls
        var children = React.cloneElement(this.props.children, {
            showControls: this.checkMouseMovement,
        });
        return (React.createElement(ContentWrapper, { ref: this.saveContentWrapperRef, showControls: showControls, onMouseMove: this.checkMouseMovement, onClick: this.onClick },
            React.createElement(CloseButtonWrapper, { className: hideControlsClassName },
                React.createElement(Button, { appearance: 'toolbar', onClick: onClose, iconBefore: React.createElement(CrossIcon, { label: "Close" }) })),
            children));
    };
    return Content;
}(Component));
export { Content };
//# sourceMappingURL=content.js.map