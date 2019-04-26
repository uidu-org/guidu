import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { injectIntl } from 'react-intl';
import { MediaEditor } from '../mediaEditor';
import { messages } from '@uidu/media-ui';
import Toolbar, { tools } from './toolbar/toolbar';
import { EditorContainer } from './styles';
var DEFAULT_WIDTH = 845;
var DEFAULT_HEIGHT = 530;
export var TOOLBAR_HEIGHT = 64;
var TRANSPARENT_COLOR = { red: 0, green: 0, blue: 0, alpha: 0 };
// Properties' names in the local storage
var propertyColor = 'media-editor-color';
var propertyTool = 'media-editor-tool';
var propertyLineWidth = 'media-editor-line-width';
var EditorView = /** @class */ (function (_super) {
    tslib_1.__extends(EditorView, _super);
    function EditorView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dimensions: {
                width: DEFAULT_WIDTH,
                height: DEFAULT_HEIGHT - TOOLBAR_HEIGHT,
            },
            color: { red: 0xbf, green: 0x26, blue: 0x00 },
            lineWidth: 8,
            tool: 'arrow',
        };
        _this.onLoad = function (_, loadParameters) {
            _this.loadParameters = loadParameters;
        };
        _this.onError = function () {
            var _a = _this.props, onError = _a.onError, formatMessage = _a.intl.formatMessage;
            onError(formatMessage(messages.could_not_load_editor));
        };
        _this.onSave = function () {
            if (!_this.loadParameters) {
                return;
            }
            var imageGetter = _this.loadParameters.imageGetter;
            var image = imageGetter();
            var _a = _this.props, onSave = _a.onSave, onError = _a.onError, formatMessage = _a.intl.formatMessage;
            _this.saveProperties();
            if (image.isExported && image.content) {
                onSave(image.content);
            }
            else {
                onError(formatMessage(messages.could_not_save_image));
            }
        };
        return _this;
    }
    EditorView.prototype.componentDidMount = function () {
        if (!this.rootDiv) {
            return;
        }
        var rect = this.rootDiv.getBoundingClientRect();
        var dimensions = {
            width: rect.width || DEFAULT_WIDTH,
            height: (rect.height || DEFAULT_HEIGHT) - TOOLBAR_HEIGHT,
        };
        this.setState({ dimensions: dimensions });
        this.loadProperties();
    };
    EditorView.prototype.componentWillUnmount = function () {
        this.saveProperties();
    };
    EditorView.prototype.render = function () {
        var _this = this;
        var refHandler = function (div) {
            _this.rootDiv = div;
        };
        return (React.createElement(EditorContainer, { ref: refHandler },
            this.renderEditor(),
            this.renderToolbar()));
    };
    EditorView.prototype.renderEditor = function () {
        var _this = this;
        var onError = function () { return _this.onError(); };
        var onShapeParametersChanged = function (_a) {
            var color = _a.color, lineWidth = _a.lineWidth;
            _this.setState({ color: color, lineWidth: lineWidth });
        };
        var imageUrl = this.props.imageUrl;
        var _a = this.state, dimensions = _a.dimensions, color = _a.color, lineWidth = _a.lineWidth, tool = _a.tool;
        return (React.createElement(MediaEditor, { imageUrl: imageUrl, dimensions: dimensions, backgroundColor: TRANSPARENT_COLOR, shapeParameters: { color: color, lineWidth: lineWidth, addShadow: true }, tool: tool, onLoad: this.onLoad, onError: onError, onShapeParametersChanged: onShapeParametersChanged }));
    };
    EditorView.prototype.renderToolbar = function () {
        var _this = this;
        var _a = this.state, tool = _a.tool, color = _a.color, lineWidth = _a.lineWidth;
        var onToolChanged = function (tool) { return _this.setState({ tool: tool }); };
        var onColorChanged = function (color) { return _this.setState({ color: color }); };
        var onLineWidthChanged = function (lineWidth) {
            return _this.setState({ lineWidth: lineWidth });
        };
        var onCancel = function () { return _this.props.onCancel(); };
        return (React.createElement(Toolbar, { tool: tool, color: color, lineWidth: lineWidth, onToolChanged: onToolChanged, onColorChanged: onColorChanged, onLineWidthChanged: onLineWidthChanged, onSave: this.onSave, onCancel: onCancel }));
    };
    // Using local storage to save and load shape properties
    EditorView.prototype.saveProperties = function () {
        var _a = this.state, tool = _a.tool, color = _a.color, lineWidth = _a.lineWidth;
        try {
            localStorage.setItem(propertyColor, JSON.stringify(color));
            localStorage.setItem(propertyTool, tool);
            localStorage.setItem(propertyLineWidth, lineWidth.toString());
        }
        catch (error) {
            // tslint:disable-next-line:no-console
            console.warn("Failed to save properties for MediaEditor: " + color + " " + tool + " " + lineWidth);
        }
    };
    EditorView.prototype.loadProperties = function () {
        var color = localStorage.getItem(propertyColor);
        if (color) {
            try {
                this.setState({
                    color: JSON.parse(color),
                });
            }
            catch (error) {
                // tslint:disable-next-line:no-console
                console.warn("Failed to parse color property for MediaEditor: " + color);
            }
        }
        var tool = localStorage.getItem(propertyTool);
        if (tool && isTool(tool)) {
            this.setState({
                tool: tool,
            });
        }
        var lineWidth = localStorage.getItem(propertyLineWidth);
        if (lineWidth) {
            this.setState({
                lineWidth: parseInt(lineWidth, 10),
            });
        }
    };
    return EditorView;
}(Component));
function isTool(value) {
    return tools.some(function (tool) { return tool === value; });
}
export default injectIntl(EditorView);
//# sourceMappingURL=editorView.js.map