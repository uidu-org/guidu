import * as tslib_1 from "tslib";
import * as React from 'react';
import { Rectangle, Vector2, Bounds, dataURItoFile, getFileInfo, getFileInfoFromSrc, } from '@uidu/media-ui';
import { ImagePlacerContainer } from './container';
import { ImagePlacerImage } from './image';
import { Margin } from './margin';
import { ImagePlacerWrapper, ImagePlacerErrorWrapper } from './styled';
import { initialiseImagePreview, renderImageAtCurrentView, } from './imageProcessor';
import { zoomToFit, applyConstraints, transformVisibleBoundsToImageCoords, } from './constraints';
/* immutable prop defaults */
export var DEFAULT_MAX_ZOOM = 4;
export var DEFAULT_MARGIN = 28;
export var DEFAULT_CONTAINER_SIZE = 200;
export var DEFAULT_ZOOM = 0;
export var DEFAULT_ORIGIN_X = 0;
export var DEFAULT_ORIGIN_Y = 0;
export var DEFAULT_USE_CONSTRAINTS = true;
export var DEFAULT_USE_CIRCULAR = false; /* whether or not to apply a circular margin to image while positioning */
export var DEFAULT_USE_CIRCULAR_CLIP_WITH_ACTIONS = false; /* whether or not to apply a circular clip when rendering via actions */
export var DEFAULT_BACKGROUND_COLOR = 'transparent';
export var defaultProps = {
    containerWidth: DEFAULT_CONTAINER_SIZE,
    containerHeight: DEFAULT_CONTAINER_SIZE,
    margin: DEFAULT_MARGIN,
    zoom: DEFAULT_ZOOM,
    maxZoom: DEFAULT_MAX_ZOOM,
    originX: DEFAULT_ORIGIN_X,
    originY: DEFAULT_ORIGIN_Y,
    useConstraints: DEFAULT_USE_CONSTRAINTS,
    isCircular: DEFAULT_USE_CIRCULAR,
    useCircularClipWithActions: DEFAULT_USE_CIRCULAR_CLIP_WITH_ACTIONS,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
};
var ImagePlacer = /** @class */ (function (_super) {
    tslib_1.__extends(ImagePlacer, _super);
    function ImagePlacer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.imageSourceRect = new Rectangle(0, 0); /* original size of image (un-scaled) */
        _this.state = {
            imageWidth: 0,
            imageHeight: 0,
            zoom: _this.props.zoom,
            originX: _this.props.originX,
            originY: _this.props.originY,
            src: _this.props.src,
        };
        /* convert the current visible region (zoomed / panned) to a correctly sized canvas with that view drawn */
        _this.toCanvas = function () {
            var _a = _this, imageElement = _a.imageElement, sourceBounds = _a.sourceBounds, visibleBounds = _a.visibleBounds, imageBounds = _a.imageBounds, containerRect = _a.containerRect, props = _a.props;
            var useConstraints = props.useConstraints, useCircularClipWithActions = props.useCircularClipWithActions, backgroundColor = props.backgroundColor;
            var viewInfo = {
                containerRect: containerRect,
                imageBounds: imageBounds,
                sourceBounds: sourceBounds,
                visibleBounds: visibleBounds,
            };
            return renderImageAtCurrentView(imageElement, viewInfo, useConstraints, useCircularClipWithActions, backgroundColor);
        };
        /* convert current visible view to dataURL for image */
        _this.toDataURL = function () {
            return _this.toCanvas().toDataURL();
        };
        /* convert current visible view to File */
        _this.toFile = function () {
            return dataURItoFile(_this.toDataURL());
        };
        /* image has loaded */
        _this.onImageLoad = function (imageElement, width, height) {
            var onImageChange = _this.props.onImageChange;
            _this.imageSourceRect = new Rectangle(width, height);
            _this.imageElement = imageElement;
            _this.setState({ imageWidth: width, imageHeight: height }, _this.update);
            if (onImageChange) {
                onImageChange(imageElement);
            }
        };
        /* image had an error */
        _this.onImageError = function (errorMessage) {
            _this.setState({ errorMessage: errorMessage });
        };
        /* drag within container has started */
        _this.onDragStart = function () {
            var _a = _this.state, originX = _a.originX, originY = _a.originY;
            _this.setState({
                dragOrigin: new Vector2(originX, originY),
            });
        };
        /* drag within container has started */
        _this.onDragMove = function (delta) {
            var dragOrigin = _this.state.dragOrigin;
            if (dragOrigin) {
                var newOriginX = dragOrigin.x + delta.x;
                var newOriginY = dragOrigin.y + delta.y;
                _this.setState({
                    originX: newOriginX,
                    originY: newOriginY,
                }, _this.applyConstraints);
            }
        };
        /* wheel event was passed from container */
        _this.onWheel = function (delta) {
            var zoom = _this.state.zoom;
            var clampedZoom = Math.min(Math.max(0, zoom + delta / 100), 1);
            _this.setZoom(clampedZoom);
            _this.updateZoomProp(clampedZoom);
        };
        return _this;
    }
    Object.defineProperty(ImagePlacer.prototype, "containerRectWithMargins", {
        /* the local rect of the container with margins */
        get: function () {
            var _a = this.props, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight, margin = _a.margin;
            return new Rectangle(containerWidth + margin * 2, containerHeight + margin * 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImagePlacer.prototype, "containerRect", {
        /* the local rect of the container without margins */
        get: function () {
            var _a = this.props, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight;
            return new Rectangle(containerWidth, containerHeight);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImagePlacer.prototype, "imageBounds", {
        /* the bounds of the scaled/panned image, relative to container */
        get: function () {
            var zoom = this.state.zoom;
            return this.calcImageBounds(zoom);
        },
        enumerable: true,
        configurable: true
    });
    ImagePlacer.prototype.calcImageBounds = function (zoom) {
        var _a = this.props, margin = _a.margin, maxZoom = _a.maxZoom;
        var _b = this.state, originX = _b.originX, originY = _b.originY, imageWidth = _b.imageWidth, imageHeight = _b.imageHeight;
        var x = margin + originX;
        var y = margin + originY;
        var maxWidthDiff = imageWidth * maxZoom - imageWidth;
        var maxHeightDiff = imageHeight * maxZoom - imageHeight;
        var width = imageWidth + maxWidthDiff * zoom;
        var height = imageHeight + maxHeightDiff * zoom;
        return new Bounds(x, y, width, height);
    };
    Object.defineProperty(ImagePlacer.prototype, "visibleBounds", {
        /* the bounds of the visible area (container - margins), relative to container */
        get: function () {
            var _a = this.props, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight, margin = _a.margin;
            return new Bounds(margin, margin, containerWidth, containerHeight);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImagePlacer.prototype, "sourceBounds", {
        /* a coordinate mapping from visibleBounds to local rect of image */
        get: function () {
            var _a = this.props, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight;
            var _b = this.transformVisibleBoundsToImageCoords(0, 0), originX = _b.x, originY = _b.y;
            var _c = this.transformVisibleBoundsToImageCoords(containerWidth, containerHeight), cornerX = _c.x, cornerY = _c.y;
            return new Bounds(originX, originY, cornerX - originX, cornerY - originY);
        },
        enumerable: true,
        configurable: true
    });
    ImagePlacer.prototype.componentWillMount = function () {
        this.provideImageActions();
    };
    ImagePlacer.prototype.provideImageActions = function () {
        var onImageActions = this.props.onImageActions;
        if (onImageActions) {
            /* provide actions which will return current image at current view */
            onImageActions({
                toCanvas: this.toCanvas,
                toDataURL: this.toDataURL,
                toFile: this.toFile,
            });
        }
    };
    /* respond to prop changes */
    ImagePlacer.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, imageSourceRect, state, props, zoom, currentUseConstraints, currentContainerWidth, currentContainerHeight, currentMargin, currentSrc, nextZoom, nextUseConstraints, nextContainerWidth, nextContainerHeight, nextMargin, nextSrc, nextOnImageActions, isZoomChange, isUseConstraintsChange, isContainerWidthChange, isContainerHeightChange, isMarginChange, isImageAction, zoomReset, fileInfo;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this, imageSourceRect = _a.imageSourceRect, state = _a.state, props = _a.props;
                        zoom = state.zoom;
                        currentUseConstraints = props.useConstraints, currentContainerWidth = props.containerWidth, currentContainerHeight = props.containerHeight, currentMargin = props.margin, currentSrc = props.src;
                        nextZoom = nextProps.zoom, nextUseConstraints = nextProps.useConstraints, nextContainerWidth = nextProps.containerWidth, nextContainerHeight = nextProps.containerHeight, nextMargin = nextProps.margin, nextSrc = nextProps.src, nextOnImageActions = nextProps.onImageActions;
                        isZoomChange = nextZoom !== undefined && nextZoom !== zoom;
                        isUseConstraintsChange = nextUseConstraints !== undefined &&
                            nextUseConstraints !== currentUseConstraints;
                        isContainerWidthChange = nextContainerWidth !== undefined &&
                            nextContainerWidth !== currentContainerWidth;
                        isContainerHeightChange = nextContainerHeight !== undefined &&
                            nextContainerHeight !== currentContainerHeight;
                        isMarginChange = nextMargin !== undefined && nextMargin !== currentMargin;
                        isImageAction = typeof nextOnImageActions !== undefined;
                        zoomReset = { zoom: 0 };
                        if (isZoomChange) {
                            this.setZoom(nextZoom);
                        }
                        if (isUseConstraintsChange) {
                            this.setState({
                                zoom: 0,
                                imageWidth: imageSourceRect.width,
                                imageHeight: imageSourceRect.height,
                            }, this.update);
                        }
                        if (isContainerWidthChange || isContainerHeightChange || isMarginChange) {
                            this.setState(zoomReset, this.update);
                            this.updateZoomProp();
                        }
                        if (!(nextSrc instanceof File && nextSrc !== currentSrc)) return [3 /*break*/, 2];
                        return [4 /*yield*/, getFileInfo(nextSrc)];
                    case 1:
                        fileInfo = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (!(typeof nextSrc === 'string' && nextSrc !== currentSrc)) return [3 /*break*/, 4];
                        return [4 /*yield*/, getFileInfoFromSrc(nextSrc)];
                    case 3:
                        fileInfo = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!fileInfo) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.preprocessFile(fileInfo)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        if (isImageAction) {
                            this.provideImageActions();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ImagePlacer.prototype.preprocessFile = function (fileInfo) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var maxZoom, previewInfo, width, height;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        maxZoom = this.props.maxZoom;
                        return [4 /*yield*/, initialiseImagePreview(fileInfo, this.containerRect, maxZoom)];
                    case 1:
                        previewInfo = _a.sent();
                        if (previewInfo) {
                            width = previewInfo.width, height = previewInfo.height;
                            this.imageSourceRect = new Rectangle(width, height);
                            this.setSrc(previewInfo.fileInfo);
                        }
                        else {
                            /* TODO: i18n https://product-fabric.atlassian.net/browse/MS-1261 */
                            this.setState({ errorMessage: 'Cannot load image' });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ImagePlacer.prototype.setSrc = function (fileInfo) {
        this.setState({
            errorMessage: undefined,
            src: fileInfo.src,
            zoom: 0,
            originX: 0,
            originY: 0,
        });
        this.updateZoomProp();
    };
    /* tell consumer that zoom has changed */
    ImagePlacer.prototype.updateZoomProp = function (value) {
        if (value === void 0) { value = 0; }
        var onZoomChange = this.props.onZoomChange;
        if (onZoomChange) {
            onZoomChange(value);
        }
    };
    /* reset view  */
    ImagePlacer.prototype.reset = function () {
        var _a = this.imageSourceRect, imageWidth = _a.width, imageHeight = _a.height;
        this.setState({
            imageWidth: imageWidth,
            imageHeight: imageHeight,
            zoom: 0,
            originX: 0,
            originY: 0,
        });
    };
    /* apply zoom if required */
    ImagePlacer.prototype.update = function () {
        var useConstraints = this.props.useConstraints;
        var _a = this.state, imageWidth = _a.imageWidth, imageHeight = _a.imageHeight;
        if (!useConstraints || imageWidth === 0 || imageHeight === 0) {
            /* don't apply unless using constraints or image size is non-zero */
            return;
        }
        this.zoomToFit();
    };
    /* zoom image up or down to fit visibleBounds */
    ImagePlacer.prototype.zoomToFit = function () {
        var _a = this.state, imageWidth = _a.imageWidth, imageHeight = _a.imageHeight;
        var _b = zoomToFit(imageWidth, imageHeight, this.visibleBounds), fittedWidth = _b.width, fittedHeight = _b.height;
        this.setState({
            imageWidth: fittedWidth,
            imageHeight: fittedHeight,
            originX: 0,
            originY: 0,
            zoom: 0,
        }, this.applyConstraints);
        this.updateZoomProp();
    };
    /* assuming zoom level is correct, move origin to ensure imageBounds edges stay within visibleBounds */
    ImagePlacer.prototype.applyConstraints = function () {
        var _a = this, props = _a.props, state = _a.state, imageBounds = _a.imageBounds, visibleBounds = _a.visibleBounds;
        var useConstraints = props.useConstraints;
        var originX = state.originX, originY = state.originY;
        var delta = applyConstraints(useConstraints, imageBounds, visibleBounds);
        this.setState({
            originX: originX + delta.x,
            originY: originY + delta.y,
        });
    };
    /* set zoom but apply constraints */
    ImagePlacer.prototype.setZoom = function (newZoom) {
        var _a = this.state, originX = _a.originX, originY = _a.originY, zoom = _a.zoom;
        var lastItemBounds = this.calcImageBounds(zoom);
        var imageBounds = this.calcImageBounds(newZoom);
        var _b = lastItemBounds.center.sub(imageBounds.center), deltaX = _b.x, deltaY = _b.y;
        var origin = new Vector2(originX + deltaX, originY + deltaY);
        this.setState({
            zoom: newZoom,
            originX: origin.x,
            originY: origin.y,
        }, this.applyConstraints);
    };
    /* transformation between visibleBounds local coords to image source rect (factoring in zoom and pan) */
    ImagePlacer.prototype.transformVisibleBoundsToImageCoords = function (visibleBoundsX, visibleBoundsY) {
        var _a = this, imageSourceRect = _a.imageSourceRect, visibleBounds = _a.visibleBounds, imageBounds = _a.imageBounds;
        return transformVisibleBoundsToImageCoords(visibleBoundsX, visibleBoundsY, imageSourceRect, imageBounds, visibleBounds);
    };
    /* make it so */
    ImagePlacer.prototype.render = function () {
        var _a = this.props, backgroundColor = _a.backgroundColor, containerWidth = _a.containerWidth, containerHeight = _a.containerHeight, margin = _a.margin, isCircular = _a.isCircular, onRenderError = _a.onRenderError;
        var _b = this.state, errorMessage = _b.errorMessage, src = _b.src;
        var imageBounds = this.imageBounds;
        var imgSrc = typeof src === 'string' ? src : undefined;
        return (React.createElement(ImagePlacerWrapper, { backgroundColor: backgroundColor },
            React.createElement(ImagePlacerContainer, { width: containerWidth, height: containerHeight, margin: margin, onDragStart: this.onDragStart, onDragMove: this.onDragMove, onWheel: this.onWheel }, errorMessage ? (React.createElement(ImagePlacerErrorWrapper, null, onRenderError ? onRenderError(errorMessage) : errorMessage)) : (React.createElement("div", null,
                React.createElement(ImagePlacerImage, { src: imgSrc, x: imageBounds.x, y: imageBounds.y, width: imageBounds.width, height: imageBounds.height, onLoad: this.onImageLoad, onError: this.onImageError }),
                React.createElement(Margin, { width: containerWidth, height: containerHeight, circular: isCircular, size: margin }))))));
    };
    ImagePlacer.defaultProps = defaultProps;
    return ImagePlacer;
}(React.Component));
export { ImagePlacer };
//# sourceMappingURL=index.js.map