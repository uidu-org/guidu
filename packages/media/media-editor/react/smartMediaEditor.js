import * as tslib_1 from "tslib";
import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { messages, Shortcut } from '@uidu/media-ui';
import Spinner from '@uidu/spinner';
import { intlShape, IntlProvider } from 'react-intl';
import EditorView from './editorView/editorView';
import { Blanket, SpinnerWrapper } from './styled';
import { fileToBase64 } from '../util';
import { injectIntl } from 'react-intl';
import ErrorView from './editorView/errorView/errorView';
var SmartMediaEditor = /** @class */ (function (_super) {
    tslib_1.__extends(SmartMediaEditor, _super);
    function SmartMediaEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hasError: false,
        };
        _this.getFile = function (identifier) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var context, collectionName, occurrenceKey, id, getFileSubscription;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = this.props.context;
                        collectionName = identifier.collectionName, occurrenceKey = identifier.occurrenceKey;
                        return [4 /*yield*/, identifier.id];
                    case 1:
                        id = _a.sent();
                        getFileSubscription = context.file
                            .getFileState(id, { collectionName: collectionName, occurrenceKey: occurrenceKey })
                            .subscribe({
                            next: function (state) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var name_1, value, base64ImageUrl;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(state.status === 'processed')) return [3 /*break*/, 1];
                                            name_1 = state.name;
                                            this.fileName = name_1;
                                            this.setImageUrl(identifier);
                                            setTimeout(function () { return getFileSubscription.unsubscribe(); }, 0);
                                            return [3 /*break*/, 7];
                                        case 1:
                                            if (!(state.status === 'error')) return [3 /*break*/, 2];
                                            this.onError(state.message);
                                            setTimeout(function () { return getFileSubscription.unsubscribe(); }, 0);
                                            return [3 /*break*/, 7];
                                        case 2:
                                            if (!state.preview) return [3 /*break*/, 7];
                                            return [4 /*yield*/, state.preview];
                                        case 3:
                                            value = (_a.sent()).value;
                                            if (!(value instanceof Blob)) return [3 /*break*/, 5];
                                            return [4 /*yield*/, fileToBase64(value)];
                                        case 4:
                                            base64ImageUrl = _a.sent();
                                            this.setState({
                                                imageUrl: base64ImageUrl,
                                            });
                                            return [3 /*break*/, 6];
                                        case 5:
                                            this.setState({
                                                imageUrl: value,
                                            });
                                            _a.label = 6;
                                        case 6:
                                            setTimeout(function () { return getFileSubscription.unsubscribe(); }, 0);
                                            _a.label = 7;
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); },
                            error: function (error) {
                                _this.onError(error);
                            },
                        });
                        this.getFileSubscription = getFileSubscription;
                        return [2 /*return*/];
                }
            });
        }); };
        _this.setImageUrl = function (identifier) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var context, id, imageUrl;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        context = this.props.context;
                        return [4 /*yield*/, identifier.id];
                    case 1:
                        id = _a.sent();
                        return [4 /*yield*/, context.getImageUrl(id, {
                                collection: identifier.collectionName,
                                mode: 'full-fit',
                            })];
                    case 2:
                        imageUrl = _a.sent();
                        this.setState({
                            imageUrl: imageUrl,
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.onSave = function (imageData) {
            var fileName = _this.fileName;
            var _a = _this.props, context = _a.context, identifier = _a.identifier, onUploadStart = _a.onUploadStart, onFinish = _a.onFinish, formatMessage = _a.intl.formatMessage;
            var collectionName = identifier.collectionName, occurrenceKey = identifier.occurrenceKey;
            var uploadableFile = {
                content: imageData,
                collection: collectionName,
                name: fileName,
            };
            var id = uuid();
            var touchedFiles = context.file.touchFiles([
                {
                    fileId: id,
                    collection: collectionName,
                },
            ], collectionName);
            var deferredUploadId = touchedFiles.then(function (touchedFiles) { return touchedFiles.created[0].uploadId; });
            var uploadableFileUpfrontIds = {
                id: id,
                deferredUploadId: deferredUploadId,
                occurrenceKey: occurrenceKey,
            };
            var uploadingFileState = context.file.upload(uploadableFile, undefined, uploadableFileUpfrontIds);
            var uploadingFileStateSubscription = uploadingFileState.subscribe({
                next: function (fileState) {
                    if (fileState.status === 'processing') {
                        onFinish();
                        setTimeout(function () { return uploadingFileStateSubscription.unsubscribe(); }, 0);
                    }
                    else if (fileState.status === 'failed-processing' ||
                        fileState.status === 'error') {
                        _this.onError(formatMessage(messages.could_not_save_image));
                        setTimeout(function () { return uploadingFileStateSubscription.unsubscribe(); }, 0);
                    }
                },
            });
            var newFileIdentifier = {
                id: id,
                collectionName: collectionName,
                mediaItemType: 'file',
            };
            onUploadStart(newFileIdentifier);
        };
        _this.onCancel = function () {
            var onFinish = _this.props.onFinish;
            onFinish();
        };
        _this.onError = function (error) {
            _this.setState({
                hasError: true,
                errorMessage: error,
            });
        };
        _this.renderLoading = function () {
            return (React.createElement(SpinnerWrapper, null,
                React.createElement(Spinner, { size: "large", invertColor: true })));
        };
        _this.renderEditor = function (imageUrl) {
            return (React.createElement(EditorView, { imageUrl: imageUrl, onSave: _this.onSave, onCancel: _this.onCancel, onError: _this.onError }));
        };
        _this.renderError = function (error) {
            var onFinish = _this.props.onFinish;
            if (error instanceof Error) {
                error = error.message;
            }
            return React.createElement(ErrorView, { message: error, onCancel: onFinish });
        };
        return _this;
    }
    SmartMediaEditor.prototype.componentDidMount = function () {
        var identifier = this.props.identifier;
        this.getFile(identifier);
    };
    SmartMediaEditor.prototype.componentWillReceiveProps = function (nextProps) {
        var _a = this.props, identifier = _a.identifier, context = _a.context;
        if (nextProps.identifier.id !== identifier.id ||
            nextProps.context !== context) {
            this.getFile(nextProps.identifier);
        }
    };
    SmartMediaEditor.prototype.componentWillUnmount = function () {
        var _a = this, getFileSubscription = _a.getFileSubscription, uploadFileSubscription = _a.uploadFileSubscription;
        if (getFileSubscription) {
            getFileSubscription.unsubscribe();
        }
        if (uploadFileSubscription) {
            uploadFileSubscription.unsubscribe();
        }
    };
    SmartMediaEditor.prototype.render = function () {
        var _a = this.state, imageUrl = _a.imageUrl, hasError = _a.hasError, errorMessage = _a.errorMessage;
        var content = hasError
            ? this.renderError(errorMessage)
            : imageUrl
                ? this.renderEditor(imageUrl)
                : this.renderLoading();
        return (React.createElement(Blanket, null,
            React.createElement(Shortcut, { keyCode: 27, handler: this.onCancel }),
            content));
    };
    SmartMediaEditor.contextTypes = {
        intl: intlShape,
    };
    return SmartMediaEditor;
}(React.Component));
export { SmartMediaEditor };
var default_1 = /** @class */ (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.render = function () {
        var Component = injectIntl(SmartMediaEditor);
        var content = React.createElement(Component, tslib_1.__assign({}, this.props));
        return this.context.intl ? (content) : (React.createElement(IntlProvider, { locale: "en" }, content));
    };
    return default_1;
}(React.Component));
export default default_1;
//# sourceMappingURL=smartMediaEditor.js.map