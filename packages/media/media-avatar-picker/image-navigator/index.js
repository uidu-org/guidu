import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { gridSize } from '@uidu/theme';
import Button from '@uidu/button';
import ScaleLargeIcon from '@atlaskit/icon/glyph/media-services/scale-large';
import ScaleSmallIcon from '@atlaskit/icon/glyph/media-services/scale-small';
import ImageCropper from '../image-cropper';
import Slider from '@atlaskit/field-range';
import Spinner from '@uidu/spinner';
import { Ellipsify, Camera, Rectangle, Vector2, messages, } from '@uidu/media-ui';
import * as exenv from 'exenv';
import { Container, SliderContainer, FileInput, ImageUploader, DragZone, DragZoneImage, DragZoneText, SelectionBlocker, PaddedBreak, ImageBg, } from './styled';
import { uploadPlaceholder, errorIcon } from './images';
import { constrainPos, constrainScale, constrainEdges, } from '../constraint-util';
import { dataURItoFile, fileSizeMb } from '../util';
import { ERROR, MAX_SIZE_MB, ACCEPT } from '../avatar-picker-dialog';
export var CONTAINER_SIZE = gridSize() * 32;
export var CONTAINER_INNER_SIZE = gridSize() * 25;
export var CONTAINER_PADDING = (CONTAINER_SIZE - CONTAINER_INNER_SIZE) / 2;
// Large images (a side > CONTAINER_SIZE) will have a scale between 0 - 1.0
// Small images (a side < CONTAINER_SIZE) will have scales greater than 1.0
// Therefore the context of the slider range min-max depends on the size of the image.
// This constant is used for the max value for smaller images, as the (scale * 100) will be greater than 100.
export var MAX_SMALL_IMAGE_SCALE = 2500;
export var containerRect = new Rectangle(CONTAINER_SIZE, CONTAINER_SIZE);
export var containerPadding = new Vector2(CONTAINER_PADDING, CONTAINER_PADDING);
var defaultState = {
    camera: new Camera(containerRect, new Rectangle(0, 0)),
    imagePos: containerPadding,
    cursorPos: new Vector2(0, 0),
    minScale: 1,
    scale: 1,
    isDragging: false,
    fileImageSource: undefined,
    isDroppingFile: false,
};
var ImageNavigator = /** @class */ (function (_super) {
    tslib_1.__extends(ImageNavigator, _super);
    function ImageNavigator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = defaultState;
        _this.onDragStarted = function (x, y) {
            _this.setState({
                isDragging: true,
                cursorPos: new Vector2(x, y),
            });
        };
        _this.onMouseMove = function (e) {
            if (_this.state.isDragging) {
                var _a = _this.state, scale = _a.scale, camera = _a.camera, imagePos = _a.imagePos, cursorPos = _a.cursorPos;
                var newCursorPos = new Vector2(e.screenX, e.screenY);
                var cursorDelta = newCursorPos.sub(cursorPos);
                var newImagePos = constrainPos(imagePos.add(cursorDelta), camera.scaledImg(scale));
                _this.setState({
                    cursorPos: newCursorPos,
                    imagePos: newImagePos,
                });
            }
        };
        _this.onMouseUp = function () {
            var _a = _this.state, imagePos = _a.imagePos, scale = _a.scale;
            _this.setState({
                isDragging: false,
            });
            _this.exportImagePos(imagePos.scaled(scale).map(Math.round));
        };
        /**
         * When newScale change we want to zoom in/out relative to the center of the frame.
         * @param newScale New scale in 0-100 format.
         */
        _this.onScaleChange = function (newScale) {
            var _a = _this.state, camera = _a.camera, minScale = _a.minScale, scale = _a.scale, imagePos = _a.imagePos;
            var constrainedScale = constrainScale(newScale / 100, minScale, camera.originalImg);
            var newPos = camera
                .scaledOffset(imagePos.scaled(-1), scale, constrainedScale)
                .scaled(-1);
            var constrainedPos = constrainEdges(newPos, camera.scaledImg(constrainedScale));
            _this.setState({
                scale: constrainedScale,
                imagePos: constrainedPos,
            });
            var haveRenderedImage = !!camera.originalImg.width;
            if (haveRenderedImage) {
                _this.exportImagePos(constrainedPos.scaled(1 / constrainedScale));
                _this.exportSize(constrainedScale);
            }
        };
        /**
         * This gets called when the cropper loads an image
         * at this point we will be able to get the height/width
         * @param width the width of the image
         * @param height the height of the image
         */
        _this.onImageSize = function (width, height) {
            var _a = _this.state, imageFile = _a.imageFile, imagePos = _a.imagePos;
            var scale = _this.calculateMinScale(width, height);
            // imageFile will not exist if imageSource passed through props.
            // therefore we have to create a File, as one needs to be raised by dialog parent component when Save clicked.
            var file = imageFile || (_this.dataURI && dataURItoFile(_this.dataURI));
            var minSize = Math.min(width, height);
            if (file) {
                _this.props.onImageLoaded(file, tslib_1.__assign({}, imagePos, { size: minSize }));
            }
            _this.setState({
                camera: new Camera(containerRect, new Rectangle(width, height)),
                minScale: scale,
                scale: scale,
            });
        };
        // Trick to have a nice <input /> appearance
        _this.onUploadButtonClick = function (e) {
            var input = e.currentTarget.querySelector('#image-input');
            if (input) {
                input.click();
            }
        };
        _this.onFileChange = function (e) {
            e.stopPropagation();
            if (e.currentTarget.files && e.currentTarget.files.length) {
                var file = e.currentTarget.files[0];
                var validationError = _this.validateFile(file);
                if (validationError) {
                    _this.props.onImageError(validationError);
                }
                else {
                    _this.readFile(file);
                }
            }
        };
        _this.onDragEnter = function (e) {
            _this.updateDroppingState(e, true);
        };
        _this.onDragOver = function (e) {
            _this.updateDroppingState(e, true);
        };
        _this.onDragLeave = function (e) {
            _this.updateDroppingState(e, false);
        };
        _this.onDrop = function (e) {
            e.stopPropagation();
            e.preventDefault();
            var dt = e.dataTransfer;
            var file = dt.files[0];
            var validationError = _this.validateFile(file);
            _this.setState({ isDroppingFile: false });
            if (validationError) {
                _this.props.onImageError(validationError);
            }
            else {
                _this.readFile(file);
            }
        };
        _this.renderDragZone = function () {
            var formatMessage = _this.props.intl.formatMessage;
            var isDroppingFile = _this.state.isDroppingFile;
            var _a = _this.props, errorMessage = _a.errorMessage, isLoading = _a.isLoading;
            var showBorder = !isLoading && !!!errorMessage;
            var dropZoneImageSrc = errorMessage ? errorIcon : uploadPlaceholder;
            var dragZoneText = errorMessage || formatMessage(messages.drag_and_drop_images_here);
            var dragZoneAlt = errorMessage || formatMessage(messages.upload_image);
            return (React.createElement(DragZone, { showBorder: showBorder, isDroppingFile: isDroppingFile, onDragLeave: _this.onDragLeave, onDragEnter: _this.onDragEnter, onDragOver: _this.onDragOver, onDrop: _this.onDrop }, isLoading ? (React.createElement(Spinner, { size: "medium" })) : (React.createElement("div", null,
                React.createElement(DragZoneImage, { src: dropZoneImageSrc, alt: dragZoneAlt }),
                React.createElement(DragZoneText, { isFullSize: !!errorMessage },
                    React.createElement(Ellipsify, { text: dragZoneText, lines: 3 }))))));
        };
        _this.onRemoveImage = function () {
            _this.setState(defaultState);
            _this.props.onRemoveImage();
        };
        return _this;
    }
    ImageNavigator.prototype.componentWillMount = function () {
        if (!exenv.canUseDOM) {
            return;
        }
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    };
    ImageNavigator.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    };
    ImageNavigator.prototype.calculateMinScale = function (width, height) {
        return Math.max(CONTAINER_INNER_SIZE / width, CONTAINER_INNER_SIZE / height);
    };
    ImageNavigator.prototype.exportSize = function (newScale) {
        var _a = this.state.camera.originalImg, width = _a.width, height = _a.height;
        // adjust cropped properties by scale value
        var minSize = Math.min(width, height);
        var size = minSize < CONTAINER_SIZE
            ? minSize
            : Math.round(CONTAINER_INNER_SIZE / newScale);
        this.props.onSizeChanged(size);
    };
    ImageNavigator.prototype.exportImagePos = function (pos) {
        var scale = this.state.scale;
        var exported = pos
            .scaled(scale)
            .sub(containerPadding)
            .scaled(1.0 / scale)
            .map(Math.abs)
            .map(Math.round);
        this.props.onPositionChanged(exported.x, exported.y);
    };
    ImageNavigator.prototype.validateFile = function (imageFile) {
        var formatMessage = this.props.intl.formatMessage;
        if (ACCEPT.indexOf(imageFile.type) === -1) {
            return formatMessage(ERROR.FORMAT);
        }
        else if (fileSizeMb(imageFile) > MAX_SIZE_MB) {
            return formatMessage(ERROR.SIZE, {
                MAX_SIZE_MB: MAX_SIZE_MB,
            });
        }
        return null;
    };
    ImageNavigator.prototype.readFile = function (imageFile) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileImageSource = e.target.result;
            var onImageUploaded = _this.props.onImageUploaded;
            if (onImageUploaded) {
                onImageUploaded(imageFile);
            }
            // TODO: [ts30] Add proper handling for null and ArrayBuffer
            _this.setState({ fileImageSource: fileImageSource, imageFile: imageFile });
        };
        reader.readAsDataURL(imageFile);
    };
    ImageNavigator.prototype.updateDroppingState = function (e, state) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ isDroppingFile: state });
    };
    ImageNavigator.prototype.renderImageUploader = function () {
        var _a = this.props, errorMessage = _a.errorMessage, isLoading = _a.isLoading;
        return (React.createElement(ImageUploader, null,
            this.renderDragZone(),
            isLoading ? null : (React.createElement("div", null,
                React.createElement(PaddedBreak, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, (errorMessage ? messages.try_again : messages.or)))),
                React.createElement(Button, { onClick: this.onUploadButtonClick, isDisabled: isLoading },
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.upload_photo)),
                    React.createElement(FileInput, { type: "file", id: "image-input", onChange: this.onFileChange, accept: ACCEPT.join(',') }))))));
    };
    ImageNavigator.prototype.renderImageCropper = function (dataURI) {
        var _a = this.state, camera = _a.camera, imagePos = _a.imagePos, scale = _a.scale, isDragging = _a.isDragging, minScale = _a.minScale;
        var _b = this.props, onLoad = _b.onLoad, onImageError = _b.onImageError;
        var _c = this, onDragStarted = _c.onDragStarted, onImageSize = _c.onImageSize, onRemoveImage = _c.onRemoveImage;
        return (React.createElement("div", null,
            React.createElement(ImageBg, null),
            React.createElement(ImageCropper, { scale: scale, imageSource: dataURI, imageWidth: camera.originalImg.width, containerSize: CONTAINER_SIZE, isCircularMask: false, top: imagePos.y, left: imagePos.x, onDragStarted: onDragStarted, onImageSize: onImageSize, onLoad: onLoad, onRemoveImage: onRemoveImage, onImageError: onImageError }),
            React.createElement(SliderContainer, null,
                React.createElement(ScaleSmallIcon, { label: "scale-small-icon" }),
                React.createElement(Slider, { value: scale * 100, min: minScale * 100, max: minScale > 1 ? MAX_SMALL_IMAGE_SCALE : 100, onChange: this.onScaleChange }),
                React.createElement(ScaleLargeIcon, { label: "scale-large-icon" })),
            isDragging ? React.createElement(SelectionBlocker, null) : null));
    };
    Object.defineProperty(ImageNavigator.prototype, "dataURI", {
        // We prioritize passed image rather than the one coming from the uploader
        get: function () {
            var _a = this.props, imageSource = _a.imageSource, errorMessage = _a.errorMessage;
            var fileImageSource = this.state.fileImageSource;
            return errorMessage ? undefined : imageSource || fileImageSource;
        },
        enumerable: true,
        configurable: true
    });
    ImageNavigator.prototype.render = function () {
        var isLoading = this.props.isLoading;
        var dataURI = this.dataURI;
        var content = dataURI && !isLoading
            ? this.renderImageCropper(dataURI)
            : this.renderImageUploader();
        return React.createElement(Container, null, content);
    };
    return ImageNavigator;
}(Component));
export { ImageNavigator };
export default injectIntl(ImageNavigator);
//# sourceMappingURL=index.js.map