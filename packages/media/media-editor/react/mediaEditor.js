import * as tslib_1 from "tslib";
import * as React from 'react';
import Spinner from '@uidu/spinner';
import { MediaEditorContainer, OutputArea, DrawingCanvas, HiddenTextArea, HiddenTextHelperDiv, SupplementaryCanvas, SpinnerWrapper, } from './styled';
import { Engine } from '../engine/engine';
import { colorSame, colorWithAlphaSame, dimensionsSame } from '../util';
import { DefaultDrawingArea, } from '../engine/components/drawingArea';
import { DefaultImageProvider, urlImageLoader, } from '../engine/components/imageProvider';
import { DefaultMouseInput } from '../engine/components/mouseInput';
import { DefaultToolbar } from '../engine/components/toolbar';
import { DefaultKeyboardInput } from '../engine/components/keyboardInput';
import { DefaultImageReceiver } from '../engine/components/imageReceiver';
import { DefaultShapeDeleter } from '../engine/components/shapeDeleter';
var defaultTextDirection = 'ltr';
var MediaEditor = /** @class */ (function (_super) {
    tslib_1.__extends(MediaEditor, _super);
    function MediaEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOutputAreaInnerRef = function (outputArea) {
            _this.outputArea = outputArea;
        };
        _this.handleSupplementaryCanvasInnerRef = function (canvas) {
            _this.supplementaryCanvas = canvas;
        };
        _this.handleHiddenTextAreaInnerRef = function (textArea) {
            _this.hiddenTextArea = textArea;
        };
        _this.handleHiddenTextHelperDivInnerRef = function (div) {
            _this.hiddenTextHelperDiv = div;
        };
        _this.handleDrawingCanvasInnerRef = function (canvas) {
            _this.canvas = canvas;
        };
        _this.renderSpinner = function () { return (React.createElement(SpinnerWrapper, null,
            React.createElement(Spinner, { size: "large", invertColor: true }))); };
        _this.isUnmounted = false;
        _this.state = {
            isImageLoaded: false,
        };
        return _this;
    }
    MediaEditor.prototype.componentDidMount = function () {
        this.loadEngine();
    };
    MediaEditor.prototype.componentDidUpdate = function (prevProps) {
        if (!this.engine) {
            return;
        }
        var currProps = this.props;
        if (currProps.imageUrl !== prevProps.imageUrl) {
            this.unloadEngine();
            this.loadEngine();
        }
        if (this.drawingArea &&
            (!dimensionsSame(currProps.dimensions, prevProps.dimensions) ||
                currProps.screenScaleFactor !== prevProps.screenScaleFactor)) {
            this.drawingArea.setSize(MediaEditor.toOutputSize(currProps));
        }
        if (!colorWithAlphaSame(currProps.backgroundColor, prevProps.backgroundColor)) {
            // TODO inform the core about the new background color
            // https://jira.atlassian.com/browse/FIL-3996
        }
        var _a = currProps.shapeParameters, currColor = _a.color, currLineWidth = _a.lineWidth, currAddShadow = _a.addShadow;
        var _b = prevProps.shapeParameters, prevColor = _b.color, prevLineWidth = _b.lineWidth, prevAddShadow = _b.addShadow;
        if (this.toolbar) {
            if (!colorSame(currColor, prevColor)) {
                this.toolbar.setColor(currColor);
            }
            if (currLineWidth !== prevLineWidth) {
                this.toolbar.setLineWidth(currLineWidth);
            }
            if (currAddShadow !== prevAddShadow) {
                this.toolbar.setAddShadow(currAddShadow);
            }
            if (currProps.tool !== prevProps.tool) {
                this.toolbar.setTool(currProps.tool);
            }
        }
    };
    MediaEditor.prototype.componentWillUnmount = function () {
        this.isUnmounted = true;
        this.unloadEngine();
    };
    MediaEditor.prototype.render = function () {
        var isImageLoaded = this.state.isImageLoaded;
        var dimensions = this.props.dimensions;
        var width = dimensions.width + "px";
        var height = dimensions.height + "px";
        return (React.createElement(MediaEditorContainer, { style: { width: width, height: height } },
            !isImageLoaded ? this.renderSpinner() : null,
            React.createElement(OutputArea, { ref: this.handleOutputAreaInnerRef, style: { width: width, height: height } },
                React.createElement(SupplementaryCanvas, { ref: this.handleSupplementaryCanvasInnerRef }),
                React.createElement(HiddenTextArea, { autoComplete: 'off', ref: this.handleHiddenTextAreaInnerRef }),
                React.createElement(HiddenTextHelperDiv, { ref: this.handleHiddenTextHelperDivInnerRef }),
                React.createElement(DrawingCanvas, { ref: this.handleDrawingCanvasInnerRef, style: { width: width, height: height } }))));
    };
    MediaEditor.prototype.loadEngine = function () {
        var _this = this;
        var imageUrl = this.props.imageUrl;
        DefaultImageProvider.create(function () { return urlImageLoader(imageUrl); }, this.supplementaryCanvas)
            .then(function (imageProvider) {
            // We must not create the engine if the component was unmounted or if the image was changed
            if (_this.isUnmounted || imageUrl !== _this.props.imageUrl) {
                return;
            }
            _this.setState({ isImageLoaded: true });
            // Creating components for the engine
            var outputSize = MediaEditor.toOutputSize(_this.props);
            var backgroundColor = _this.props.backgroundColor;
            _this.drawingArea = new DefaultDrawingArea(_this.canvas, outputSize, backgroundColor);
            var mouseInput = new DefaultMouseInput(_this.outputArea);
            _this.toolbar = new DefaultToolbar(function (params) {
                return _this.props.onShapeParametersChanged(params);
            });
            var keyboardInput = new DefaultKeyboardInput(_this.hiddenTextArea, _this.supplementaryCanvas, _this.hiddenTextHelperDiv);
            var imageReceiver = new DefaultImageReceiver(_this.supplementaryCanvas);
            var shapeDeleter = new DefaultShapeDeleter(_this.hiddenTextArea);
            // Creating the engine
            var _a = _this.props, shapeParameters = _a.shapeParameters, initialTool = _a.tool;
            var textDirection = window.getComputedStyle(_this.outputArea)
                .direction || defaultTextDirection;
            var config = {
                // tslint:disable-next-line:no-console
                onCoreError: function (message) {
                    // tslint:disable-next-line
                    console.error(message);
                },
                shapeParameters: shapeParameters,
                initialTool: initialTool,
                textDirection: textDirection,
                drawingArea: _this.drawingArea,
                imageProvider: imageProvider,
                mouseInput: mouseInput,
                toolbar: _this.toolbar,
                keyboardInput: keyboardInput,
                imageReceiver: imageReceiver,
                shapeDeleter: shapeDeleter,
            };
            _this.engine = new Engine(config);
            var loadParameters = {
                imageGetter: function (format) { return _this.engine.getBase64Image(format); },
            };
            _this.props.onLoad(imageUrl, loadParameters);
        })
            .catch(function (error) { return _this.props.onError(imageUrl, error); });
    };
    MediaEditor.prototype.unloadEngine = function () {
        if (this.engine) {
            this.engine.unload();
            delete this.engine;
            this.setState({ isImageLoaded: false });
        }
    };
    MediaEditor.toOutputSize = function (props) {
        var dimensions = props.dimensions;
        var screenScaleFactor = props.screenScaleFactor || MediaEditor.screenScaleFactor;
        return {
            width: dimensions.width * screenScaleFactor,
            height: dimensions.height * screenScaleFactor,
            screenScaleFactor: screenScaleFactor,
        };
    };
    Object.defineProperty(MediaEditor, "screenScaleFactor", {
        get: function () {
            return window.devicePixelRatio || 1;
        },
        enumerable: true,
        configurable: true
    });
    return MediaEditor;
}(React.Component));
export { MediaEditor };
export default MediaEditor;
//# sourceMappingURL=mediaEditor.js.map