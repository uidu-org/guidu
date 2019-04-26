import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { ContextFactory } from '@uidu/media-core';
import ModalDialog, { ModalTransition } from '@uidu/modal-dialog';
import { BinaryUploaderImpl as MpBinary } from '../../components/binary';
import { BrowserImpl as MpBrowser } from '../../components/browser';
import { DropzoneImpl as MpDropzone } from '../../components/dropzone';
/* Components */
import Footer from './footer/footer';
import Sidebar from './sidebar/sidebar';
import UploadView from './views/upload/upload';
import GiphyView from './views/giphy/giphyView';
import Browser from './views/browser/browser';
import { Dropzone } from './dropzone/dropzone';
import MainEditorView from './views/editor/mainEditorView';
/* Configs */
import { RECENTS_COLLECTION } from '../config';
/* actions */
import { startApp } from '../actions/startApp';
import { hidePopup } from '../actions/hidePopup';
import { fileUploadsStart } from '../actions/fileUploadsStart';
import { fileUploadPreviewUpdate } from '../actions/fileUploadPreviewUpdate';
import { fileUploadProgress } from '../actions/fileUploadProgress';
import { fileUploadProcessingStart } from '../actions/fileUploadProcessingStart';
import { fileUploadEnd } from '../actions/fileUploadEnd';
import { fileUploadError } from '../actions/fileUploadError';
import { dropzoneDropIn } from '../actions/dropzoneDropIn';
import { dropzoneDragIn } from '../actions/dropzoneDragIn';
import { dropzoneDragOut } from '../actions/dropzoneDragOut';
import PassContext from './passContext';
import { MediaPickerPopupWrapper, SidebarWrapper, ViewWrapper } from './styled';
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App(props) {
        var _this = _super.call(this, props) || this;
        _this.onDragLeave = function (payload) {
            var onDropzoneDragOut = _this.props.onDropzoneDragOut;
            onDropzoneDragOut(payload.length);
            _this.setDropzoneActive(false);
        };
        _this.onDragEnter = function (payload) {
            var onDropzoneDragIn = _this.props.onDropzoneDragIn;
            onDropzoneDragIn(payload.length);
            _this.setDropzoneActive(true);
        };
        _this.onDrop = function (payload) {
            var _a = _this.props, onDropzoneDropIn = _a.onDropzoneDropIn, onUploadsStart = _a.onUploadsStart;
            onDropzoneDropIn(payload.files.length);
            onUploadsStart(payload);
        };
        _this.setDropzoneActive = function (isDropzoneActive) {
            _this.setState({
                isDropzoneActive: isDropzoneActive,
            });
        };
        var onStartApp = props.onStartApp, onUploadsStart = props.onUploadsStart, onUploadPreviewUpdate = props.onUploadPreviewUpdate, onUploadStatusUpdate = props.onUploadStatusUpdate, onUploadProcessing = props.onUploadProcessing, onUploadEnd = props.onUploadEnd, onUploadError = props.onUploadError, tenantContext = props.tenantContext, userContext = props.userContext, tenantUploadParams = props.tenantUploadParams;
        _this.state = {
            isDropzoneActive: false,
        };
        // Context that has both auth providers defined explicitly using to provided contexts.
        // Each of the local components using this context will upload first to user's recents
        // and then copy to a tenant's collection.
        var context = ContextFactory.create({
            authProvider: tenantContext.config.authProvider,
            userAuthProvider: userContext.config.authProvider,
            cacheSize: tenantContext.config.cacheSize,
        });
        _this.mpBrowser = new MpBrowser(context, {
            uploadParams: tenantUploadParams,
            shouldCopyFileToRecents: false,
            multiple: true,
        });
        _this.mpBrowser.on('uploads-start', onUploadsStart);
        _this.mpBrowser.on('upload-preview-update', onUploadPreviewUpdate);
        _this.mpBrowser.on('upload-status-update', onUploadStatusUpdate);
        _this.mpBrowser.on('upload-processing', onUploadProcessing);
        _this.mpBrowser.on('upload-end', onUploadEnd);
        _this.mpBrowser.on('upload-error', onUploadError);
        _this.mpDropzone = new MpDropzone(context, {
            uploadParams: tenantUploadParams,
            shouldCopyFileToRecents: false,
            headless: true,
        });
        _this.mpDropzone.on('drag-enter', _this.onDragEnter);
        _this.mpDropzone.on('drag-leave', _this.onDragLeave);
        _this.mpDropzone.on('uploads-start', _this.onDrop);
        _this.mpDropzone.on('upload-preview-update', onUploadPreviewUpdate);
        _this.mpDropzone.on('upload-status-update', onUploadStatusUpdate);
        _this.mpDropzone.on('upload-processing', onUploadProcessing);
        _this.mpDropzone.on('upload-end', onUploadEnd);
        _this.mpDropzone.on('upload-error', onUploadError);
        _this.mpBinary = new MpBinary(context, {
            uploadParams: tenantUploadParams,
            shouldCopyFileToRecents: false,
        });
        _this.mpBinary.on('uploads-start', onUploadsStart);
        _this.mpBinary.on('upload-preview-update', onUploadPreviewUpdate);
        _this.mpBinary.on('upload-status-update', onUploadStatusUpdate);
        _this.mpBinary.on('upload-processing', onUploadProcessing);
        _this.mpBinary.on('upload-end', onUploadEnd);
        _this.mpBinary.on('upload-error', onUploadError);
        onStartApp({
            onCancelUpload: function (uploadId) {
                _this.mpBrowser.cancel(uploadId);
                _this.mpDropzone.cancel(uploadId);
                _this.mpBinary.cancel(uploadId);
            },
        });
        return _this;
    }
    App.prototype.componentWillReceiveProps = function (_a) {
        var isVisible = _a.isVisible;
        if (isVisible !== this.props.isVisible) {
            if (isVisible) {
                this.mpDropzone.activate();
            }
            else {
                this.mpDropzone.deactivate();
            }
        }
    };
    App.prototype.componentWillUnmount = function () {
        this.mpDropzone.deactivate();
    };
    App.prototype.render = function () {
        var _a = this.props, selectedServiceName = _a.selectedServiceName, isVisible = _a.isVisible, onClose = _a.onClose, store = _a.store, proxyReactContext = _a.proxyReactContext;
        var isDropzoneActive = this.state.isDropzoneActive;
        return (React.createElement(ModalTransition, null, isVisible && (React.createElement(Provider, { store: store },
            React.createElement(ModalDialog, { onClose: onClose, width: "x-large", isChromeless: true },
                React.createElement(PassContext, { store: store, proxyReactContext: proxyReactContext },
                    React.createElement(MediaPickerPopupWrapper, null,
                        React.createElement(SidebarWrapper, null,
                            React.createElement(Sidebar, null)),
                        React.createElement(ViewWrapper, null,
                            this.renderCurrentView(selectedServiceName),
                            React.createElement(Footer, null)),
                        React.createElement(Dropzone, { isActive: isDropzoneActive }),
                        React.createElement(MainEditorView, { binaryUploader: this.mpBinary }))))))));
    };
    App.prototype.renderCurrentView = function (selectedServiceName) {
        if (selectedServiceName === 'upload') {
            // We need to create a new context since Cards in recents view need user auth
            var userContext = this.props.userContext;
            return (React.createElement(UploadView, { mpBrowser: this.mpBrowser, context: userContext, recentsCollection: RECENTS_COLLECTION }));
        }
        else if (selectedServiceName === 'giphy') {
            return React.createElement(GiphyView, null);
        }
        else {
            return React.createElement(Browser, null);
        }
    };
    return App;
}(Component));
export { App };
var mapStateToProps = function (_a) {
    var view = _a.view, tenantContext = _a.tenantContext, userContext = _a.userContext, config = _a.config;
    return ({
        selectedServiceName: view.service.name,
        isVisible: view.isVisible,
        config: config,
        tenantContext: tenantContext,
        userContext: userContext,
    });
};
var mapDispatchToProps = function (dispatch) { return ({
    onStartApp: function (payload) { return dispatch(startApp(payload)); },
    onUploadsStart: function (payload) {
        return dispatch(fileUploadsStart(payload));
    },
    onClose: function () { return dispatch(hidePopup()); },
    onUploadPreviewUpdate: function (payload) {
        return dispatch(fileUploadPreviewUpdate(payload));
    },
    onUploadStatusUpdate: function (payload) {
        return dispatch(fileUploadProgress(payload));
    },
    onUploadProcessing: function (payload) {
        return dispatch(fileUploadProcessingStart(payload));
    },
    onUploadEnd: function (payload) {
        return dispatch(fileUploadEnd(payload));
    },
    onUploadError: function (payload) {
        return dispatch(fileUploadError(payload));
    },
    onDropzoneDragIn: function (fileCount) { return dispatch(dropzoneDragIn(fileCount)); },
    onDropzoneDragOut: function (fileCount) {
        return dispatch(dropzoneDragOut(fileCount));
    },
    onDropzoneDropIn: function (fileCount) { return dispatch(dropzoneDropIn(fileCount)); },
}); };
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map