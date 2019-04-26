import * as tslib_1 from "tslib";
import { EditorView } from '@uidu/media-editor';
import { deselectItem } from '../../../actions/deselectItem';
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import ErrorView from './errorView/errorView';
import { SpinnerView } from './spinnerView/spinnerView';
import { editorClose } from '../../../actions/editorClose';
import { editorShowError } from '../../../actions/editorShowError';
import { CenterView } from './styles';
var MainEditorView = /** @class */ (function (_super) {
    tslib_1.__extends(MainEditorView, _super);
    function MainEditorView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderContent = function (editorData) {
            var imageUrl = editorData.imageUrl, originalFile = editorData.originalFile, error = editorData.error;
            if (error) {
                return _this.renderError(error);
            }
            else if (imageUrl && originalFile) {
                return (React.createElement(CenterView, null,
                    React.createElement(EditorView, { imageUrl: imageUrl, onSave: _this.onEditorSave(originalFile), onCancel: _this.onCancel, onError: _this.onEditorError })));
            }
            else {
                return React.createElement(SpinnerView, { onCancel: _this.onCancel });
            }
        };
        _this.onEditorError = function (message, retryHandler) {
            _this.props.onShowEditorError({ message: message, retryHandler: retryHandler });
        };
        _this.onEditorSave = function (originalFile) { return function (image) {
            var _a = _this.props, binaryUploader = _a.binaryUploader, onDeselectFile = _a.onDeselectFile, onCloseEditor = _a.onCloseEditor;
            binaryUploader.upload(image, originalFile.name);
            onDeselectFile(originalFile.id);
            onCloseEditor('Save');
        }; };
        _this.onCancel = function () {
            _this.props.onCloseEditor('Close');
        };
        return _this;
    }
    MainEditorView.prototype.render = function () {
        var editorData = this.props.editorData;
        if (editorData) {
            return this.renderContent(editorData);
        }
        else {
            return null;
        }
    };
    MainEditorView.prototype.renderError = function (_a) {
        var message = _a.message, retryHandler = _a.retryHandler;
        return (React.createElement(ErrorView, { message: message, onRetry: retryHandler, onCancel: this.onCancel }));
    };
    return MainEditorView;
}(Component));
export { MainEditorView };
export default connect(function (_a) {
    var editorData = _a.editorData;
    return ({ editorData: editorData });
}, function (dispatch) { return ({
    onShowEditorError: function (_a) {
        var message = _a.message, retryHandler = _a.retryHandler;
        return dispatch(editorShowError(message, retryHandler));
    },
    onCloseEditor: function (selection) { return dispatch(editorClose(selection)); },
    onDeselectFile: function (fileId) { return dispatch(deselectItem(fileId)); },
}); })(MainEditorView);
//# sourceMappingURL=mainEditorView.js.map