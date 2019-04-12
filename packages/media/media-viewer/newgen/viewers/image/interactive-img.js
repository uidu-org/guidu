import * as tslib_1 from "tslib";
import * as React from 'react';
import { Rectangle, Camera, Vector2, getCssFromImageOrientation, } from '@uidu/media-ui';
import { BaselineExtend, ImageWrapper, Img } from '../../styled';
import { ZoomLevel } from '../../domain/zoomLevel';
import { closeOnDirectClick } from '../../utils/closeOnDirectClick';
import { ZoomControls } from '../../zoomControls';
import { Outcome } from '../../domain';
export function zoomLevelAfterResize(newCamera, oldCamera, oldZoomLevel) {
    var isImgScaledToFit = oldZoomLevel.value === oldCamera.scaleDownToFit;
    var zoomLevelToRefit = new ZoomLevel(newCamera.scaleDownToFit);
    return isImgScaledToFit ? zoomLevelToRefit : oldZoomLevel;
}
var clientRectangle = function (el) {
    var clientWidth = el.clientWidth, clientHeight = el.clientHeight;
    return new Rectangle(clientWidth, clientHeight);
};
var naturalSizeRectangle = function (el) {
    var naturalWidth = el.naturalWidth, naturalHeight = el.naturalHeight;
    return new Rectangle(naturalWidth, naturalHeight);
};
var initialState = {
    zoomLevel: new ZoomLevel(1),
    camera: Outcome.pending(),
    isDragging: false,
    cursorPos: new Vector2(0, 0),
};
var InteractiveImg = /** @class */ (function (_super) {
    tslib_1.__extends(InteractiveImg, _super);
    function InteractiveImg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = initialState;
        _this.saveWrapperRef = function (ref) { return (_this.wrapper = ref); };
        _this.onImgLoad = function (ev) {
            if (_this.wrapper) {
                var viewport = clientRectangle(_this.wrapper);
                var originalImg = naturalSizeRectangle(ev.currentTarget);
                var camera = new Camera(viewport, originalImg);
                _this.setState({
                    camera: Outcome.successful(camera),
                    zoomLevel: new ZoomLevel(camera.scaleDownToFit),
                });
            }
            _this.props.onLoad();
        };
        _this.onError = function () {
            _this.props.onError();
        };
        _this.onResize = function () {
            _this.state.camera.whenSuccessful(function (oldCamera) {
                if (!_this.wrapper) {
                    return;
                }
                var oldZoomLevel = _this.state.zoomLevel;
                var newViewport = clientRectangle(_this.wrapper);
                var newCamera = oldCamera.resizedViewport(newViewport);
                var newZoomLevel = zoomLevelAfterResize(newCamera, oldCamera, oldZoomLevel);
                _this.setState({
                    camera: Outcome.successful(newCamera),
                    zoomLevel: newZoomLevel,
                });
            });
        };
        _this.onZoomChange = function (nextZoomLevel) {
            _this.state.camera.whenSuccessful(function (camera) {
                var wrapper = _this.wrapper;
                if (!wrapper) {
                    return;
                }
                var scrollLeft = wrapper.scrollLeft, scrollTop = wrapper.scrollTop;
                var prevOffset = new Vector2(scrollLeft, scrollTop);
                var prevZoomLevel = _this.state.zoomLevel;
                _this.setState({ zoomLevel: nextZoomLevel }, function () {
                    var _a = camera.scaledOffset(prevOffset, prevZoomLevel.value, nextZoomLevel.value), x = _a.x, y = _a.y;
                    wrapper.scrollLeft = x;
                    wrapper.scrollTop = y;
                });
            });
        };
        _this.startDragging = function (ev) {
            ev.preventDefault();
            _this.setState({
                isDragging: true,
                cursorPos: new Vector2(ev.screenX, ev.screenY),
            });
        };
        _this.stopDragging = function (ev) {
            ev.preventDefault();
            _this.setState({ isDragging: false });
        };
        _this.panImage = function (ev) {
            if (_this.state.isDragging && _this.wrapper) {
                var cursorPos = new Vector2(ev.screenX, ev.screenY);
                var delta = _this.state.cursorPos.sub(cursorPos);
                _this.setState({ cursorPos: cursorPos });
                _this.wrapper.scrollLeft += delta.x;
                _this.wrapper.scrollTop += delta.y;
            }
        };
        return _this;
    }
    InteractiveImg.prototype.componentDidMount = function () {
        this.state = initialState;
        window.addEventListener('resize', this.onResize);
        document.addEventListener('mousemove', this.panImage);
        document.addEventListener('mouseup', this.stopDragging);
    };
    InteractiveImg.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.onResize);
        document.removeEventListener('mousemove', this.panImage);
        document.removeEventListener('mouseup', this.stopDragging);
    };
    InteractiveImg.prototype.render = function () {
        var _a = this.props, src = _a.src, onClose = _a.onClose, orientation = _a.orientation;
        var _b = this.state, zoomLevel = _b.zoomLevel, camera = _b.camera, isDragging = _b.isDragging;
        var canDrag = camera.match({
            successful: function (camera) { return zoomLevel.value > camera.scaleToFit; },
            pending: function () { return false; },
            failed: function () { return false; },
        });
        // We use style attr instead of SC prop for perf reasons
        var imgStyle = camera.match({
            successful: function (camera) { return camera.scaledImg(zoomLevel.value); },
            pending: function () { return ({}); },
            failed: function () { return ({}); },
        });
        if (orientation) {
            var transform = getCssFromImageOrientation(orientation);
            imgStyle.transform = transform;
        }
        return (React.createElement(ImageWrapper, { onClick: closeOnDirectClick(onClose), ref: this.saveWrapperRef },
            React.createElement(Img, { canDrag: canDrag, isDragging: isDragging, src: src, style: imgStyle, onLoad: this.onImgLoad, onError: this.onError, onMouseDown: this.startDragging, shouldPixelate: zoomLevel.value > 1 }),
            React.createElement(BaselineExtend, null),
            React.createElement(ZoomControls, { zoomLevel: zoomLevel, onChange: this.onZoomChange })));
    };
    return InteractiveImg;
}(React.Component));
export { InteractiveImg };
//# sourceMappingURL=interactive-img.js.map