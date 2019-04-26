import * as tslib_1 from "tslib";
/**
 * The Container is responsible for implementing the mouse/touch events.
 * This way, you can still move the image without clicking directly on it.
 */
import * as React from 'react';
import { ContainerWrapper } from './styled';
import { Vector2 } from '@uidu/media-ui';
var ImagePlacerContainer = /** @class */ (function (_super) {
    tslib_1.__extends(ImagePlacerContainer, _super);
    function ImagePlacerContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMouseDown = function (e) {
            if (e.button === 2) {
                return;
            }
            _this.dragClientStart = new Vector2(e.clientX, e.clientY);
            _this.props.onDragStart();
        };
        _this.onTouchStart = function (e) {
            if (e.touches && e.touches.length >= 1) {
                var touch = e.touches[0];
                _this.dragClientStart = new Vector2(touch.clientX, touch.clientY);
                _this.props.onDragStart();
            }
        };
        _this.onMouseMove = function (e) {
            var dragClientStart = _this.dragClientStart;
            if (dragClientStart) {
                var delta = new Vector2(e.clientX - dragClientStart.x, e.clientY - dragClientStart.y);
                _this.props.onDragMove(delta);
            }
        };
        _this.onTouchMove = function (e) {
            var dragClientStart = _this.dragClientStart;
            if (e.touches && e.touches.length >= 1) {
                var touch = e.touches[0];
                if (touch && dragClientStart) {
                    var delta = new Vector2(touch.clientX - dragClientStart.x, touch.clientY - dragClientStart.y);
                    _this.props.onDragMove(delta);
                }
            }
        };
        _this.onMouseUp = function () {
            delete _this.dragClientStart;
        };
        _this.onWheel = function (e) {
            _this.props.onWheel(e.deltaY);
        };
        return _this;
    }
    ImagePlacerContainer.prototype.componentWillMount = function () {
        if (this.isTouch) {
            document.addEventListener('touchmove', this.onTouchMove);
            document.addEventListener('touchend', this.onMouseUp);
            document.addEventListener('touchcancel', this.onMouseUp);
        }
        else {
            document.addEventListener('mousemove', this.onMouseMove);
            document.addEventListener('mouseup', this.onMouseUp);
        }
    };
    ImagePlacerContainer.prototype.componentWillUnmount = function () {
        if (this.isTouch) {
            document.removeEventListener('touchmove', this.onTouchMove);
            document.removeEventListener('touchend', this.onMouseUp);
            document.removeEventListener('touchcancel', this.onMouseUp);
        }
        else {
            document.removeEventListener('mousemove', this.onMouseMove);
            document.removeEventListener('mouseup', this.onMouseUp);
        }
    };
    Object.defineProperty(ImagePlacerContainer.prototype, "isDragging", {
        get: function () {
            return this.dragClientStart !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImagePlacerContainer.prototype, "isTouch", {
        get: function () {
            return window.hasOwnProperty('ontouchstart');
        },
        enumerable: true,
        configurable: true
    });
    ImagePlacerContainer.prototype.render = function () {
        var isTouch = this.isTouch;
        var _a = this.props, width = _a.width, height = _a.height, children = _a.children, margin = _a.margin;
        var onMouseDown = isTouch ? undefined : this.onMouseDown;
        var onTouchStart = isTouch ? this.onTouchStart : undefined;
        return (React.createElement(ContainerWrapper, { width: width, height: height, margin: margin, onMouseDown: onMouseDown, onTouchStart: onTouchStart, onWheel: this.onWheel }, children));
    };
    return ImagePlacerContainer;
}(React.Component));
export { ImagePlacerContainer };
//# sourceMappingURL=container.js.map