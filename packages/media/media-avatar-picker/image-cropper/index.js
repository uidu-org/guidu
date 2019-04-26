import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { injectIntl } from 'react-intl';
import { messages } from '@uidu/media-ui';
import { isImageRemote } from './isImageRemote';
import { CircularMask, Container, DragOverlay, RectMask, Image, RemoveImageContainer, RemoveImageButton, containerPadding, } from './styled';
import { ERROR } from '../avatar-picker-dialog';
import { CONTAINER_INNER_SIZE } from '../image-navigator';
var defaultScale = 1;
var ImageCropper = /** @class */ (function (_super) {
    tslib_1.__extends(ImageCropper, _super);
    function ImageCropper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onDragStarted = function (e) {
            if (_this.props.onDragStarted) {
                _this.props.onDragStarted(e.screenX, e.screenY);
            }
        };
        _this.onImageLoaded = function (e) {
            var image = e.target;
            _this.props.onImageSize(image.naturalWidth, image.naturalHeight);
            _this.imageElement = image;
        };
        _this.onImageError = function () {
            var _a = _this.props, onImageError = _a.onImageError, formatMessage = _a.intl.formatMessage;
            onImageError(formatMessage(ERROR.FORMAT));
        };
        _this.export = function () {
            var imageData = '';
            var canvas = document.createElement('canvas');
            var _a = _this.props, top = _a.top, left = _a.left, scale = _a.scale, containerSize = _a.containerSize;
            var size = containerSize || 0;
            var scaleWithDefault = scale || 1;
            var destinationSize = Math.max(size - containerPadding * 2, 0);
            canvas.width = destinationSize;
            canvas.height = destinationSize;
            var context = canvas.getContext('2d');
            if (context && _this.imageElement) {
                var sourceLeft = (-left + containerPadding) / scaleWithDefault;
                var sourceTop = (-top + containerPadding) / scaleWithDefault;
                var sourceWidth = destinationSize / scaleWithDefault;
                var sourceHeight = destinationSize / scaleWithDefault;
                context.drawImage(_this.imageElement, sourceLeft, sourceTop, sourceWidth, sourceHeight, 0, 0, destinationSize, destinationSize);
                imageData = canvas.toDataURL();
            }
            return imageData;
        };
        return _this;
    }
    ImageCropper.prototype.componentDidMount = function () {
        var _a = this.props, onLoad = _a.onLoad, imageSource = _a.imageSource, onImageError = _a.onImageError, formatMessage = _a.intl.formatMessage;
        if (onLoad) {
            onLoad({
                export: this.export,
            });
        }
        try {
            isImageRemote(imageSource);
        }
        catch (e) {
            onImageError(formatMessage(ERROR.URL));
        }
    };
    ImageCropper.prototype.render = function () {
        var _a = this.props, isCircularMask = _a.isCircularMask, containerSize = _a.containerSize, top = _a.top, left = _a.left, imageSource = _a.imageSource, onRemoveImage = _a.onRemoveImage, formatMessage = _a.intl.formatMessage;
        var containerStyle = {
            width: containerSize + "px",
            height: containerSize + "px",
        };
        var width = this.width ? this.width + "px" : 'auto';
        var imageStyle = {
            width: width,
            display: width === 'auto' ? 'none' : 'block',
            top: top + "px",
            left: left + "px",
        };
        var crossOrigin;
        try {
            crossOrigin = isImageRemote(imageSource) ? 'anonymous' : undefined;
        }
        catch (e) {
            return null;
        }
        return (React.createElement(Container, { style: containerStyle },
            React.createElement(Image, { crossOrigin: crossOrigin, src: imageSource, style: imageStyle, onLoad: this.onImageLoaded, onError: this.onImageError }),
            isCircularMask ? React.createElement(CircularMask, null) : React.createElement(RectMask, null),
            React.createElement(DragOverlay, { onMouseDown: this.onDragStarted }),
            React.createElement(RemoveImageContainer, null,
                React.createElement(RemoveImageButton, { onClick: onRemoveImage },
                    React.createElement(CrossIcon, { size: "small", label: formatMessage(messages.remove_image) })))));
    };
    Object.defineProperty(ImageCropper.prototype, "width", {
        get: function () {
            var _a = this.props, imageWidth = _a.imageWidth, scale = _a.scale;
            return imageWidth ? imageWidth * (scale || defaultScale) : 0;
        },
        enumerable: true,
        configurable: true
    });
    ImageCropper.defaultProps = {
        containerSize: CONTAINER_INNER_SIZE,
        isCircleMask: false,
        scale: defaultScale,
        onDragStarted: function () { },
        onImageSize: function () { },
    };
    return ImageCropper;
}(Component));
export { ImageCropper };
export default injectIntl(ImageCropper);
//# sourceMappingURL=index.js.map