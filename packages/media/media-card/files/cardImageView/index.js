import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { CardOverlay } from './cardOverlay';
import { PlayIconWrapper, Wrapper, ProgressBarWrapper, Body, CardActionsWrapper, Overlay, ProgressWrapper, Title, } from './styled';
import { isLoadingImage } from '../../utils/isLoadingImage';
import { MediaImage } from '../../utils/mediaImage';
import { CardLoading } from '../../utils/cardLoading';
import VidPlayIcon from '@atlaskit/icon/glyph/vid-play';
import { shouldDisplayImageThumbnail } from '../../utils/shouldDisplayImageThumbnail';
import { Ellipsify } from '@uidu/media-ui';
import { ProgressBar } from '../../utils/progressBar';
import CardActions from '../../utils/cardActions';
var FileCardImageView = /** @class */ (function (_super) {
    tslib_1.__extends(FileCardImageView, _super);
    function FileCardImageView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCardContents = function () {
            var status = _this.props.status;
            if (status === 'error') {
                return _this.renderErrorContents();
            }
            else if (status === 'failed-processing') {
                return _this.renderFailedContents();
            }
            if (_this.isImageNotReadyForDisplay) {
                return _this.renderLoadingContents();
            }
            return _this.renderSuccessCardContents();
        };
        _this.renderLoadingContents = function () {
            return (React.createElement("div", { className: "wrapper" },
                React.createElement("div", { className: "img-wrapper" },
                    React.createElement(CardLoading, null))));
        };
        _this.renderErrorContents = function () {
            var _a = _this.props, error = _a.error, mediaName = _a.mediaName, mediaType = _a.mediaType, onRetry = _a.onRetry, actions = _a.actions, fileSize = _a.fileSize;
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "wrapper" }),
                React.createElement(CardOverlay, { persistent: true, mediaName: mediaName, mediaType: mediaType, error: error, onRetry: onRetry, actions: actions, subtitle: fileSize })));
        };
        _this.renderFailedContents = function () {
            var _a = _this.props, mediaName = _a.mediaName, mediaType = _a.mediaType, actions = _a.actions, fileSize = _a.fileSize;
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: "wrapper" }),
                React.createElement(CardOverlay, { noHover: true, persistent: true, mediaName: mediaName, mediaType: mediaType, actions: actions, subtitle: fileSize })));
        };
        _this.renderUploadingCardOverlay = function () {
            var _a = _this.props, mediaType = _a.mediaType, dataURI = _a.dataURI, selectable = _a.selectable, selected = _a.selected;
            var isPersistent = mediaType === 'doc' || !dataURI;
            return (React.createElement(CardOverlay, { persistent: isPersistent, selectable: selectable, selected: selected }));
        };
        _this.renderPlayButton = function () {
            var mediaType = _this.props.mediaType;
            if (mediaType !== 'video') {
                return null;
            }
            return (React.createElement(PlayIconWrapper, null,
                React.createElement(VidPlayIcon, { label: "play", size: "large" })));
        };
        _this.renderMediaImage = function () {
            var _a = _this.props, dataURI = _a.dataURI, mediaType = _a.mediaType, previewOrientation = _a.previewOrientation;
            if (shouldDisplayImageThumbnail(dataURI, mediaType)) {
                return (React.createElement(MediaImage, { dataURI: dataURI, crop: _this.isCropped, stretch: _this.isStretched, previewOrientation: previewOrientation }));
            }
            return null;
        };
        _this.renderProgressBar = function () {
            var _a = _this.props, mediaName = _a.mediaName, progress = _a.progress, actions = _a.actions, status = _a.status;
            if (status !== 'uploading') {
                return null;
            }
            return (React.createElement(ProgressBarWrapper, null,
                React.createElement(Overlay, null,
                    React.createElement(Title, null,
                        React.createElement(Ellipsify, { text: mediaName || '', lines: 2 })),
                    React.createElement(Body, null,
                        React.createElement(ProgressWrapper, null,
                            React.createElement(ProgressBar, { progress: progress })),
                        React.createElement(CardActionsWrapper, null, actions ? (React.createElement(CardActions, { actions: actions, triggerColor: "white" })) : null)))));
        };
        _this.renderSuccessCardContents = function () {
            var _a = _this.props, disableOverlay = _a.disableOverlay, selectable = _a.selectable, status = _a.status;
            var overlay = null;
            if (!disableOverlay) {
                if (status === 'uploading') {
                    if (selectable) {
                        overlay = _this.renderUploadingCardOverlay();
                    }
                }
                else {
                    overlay = _this.renderSuccessCardOverlay();
                }
            }
            return (React.createElement("div", { className: "wrapper" },
                React.createElement("div", { className: "img-wrapper" },
                    _this.renderMediaImage(),
                    _this.renderProgressBar(),
                    _this.renderPlayButton()),
                overlay));
        };
        _this.renderSuccessCardOverlay = function () {
            var _a = _this.props, mediaName = _a.mediaName, mediaType = _a.mediaType, fileSize = _a.fileSize, dataURI = _a.dataURI, selectable = _a.selectable, selected = _a.selected, actions = _a.actions;
            var isPersistent = mediaType === 'doc' || !dataURI;
            return (React.createElement(CardOverlay, { persistent: isPersistent, selectable: selectable, selected: selected, mediaName: mediaName, mediaType: mediaType, subtitle: fileSize, actions: actions }));
        };
        return _this;
    }
    FileCardImageView.prototype.render = function () {
        var _a = this.props, disableOverlay = _a.disableOverlay, selectable = _a.selectable, selected = _a.selected, mediaType = _a.mediaType;
        return (React.createElement(Wrapper, { disableOverlay: disableOverlay, selectable: selectable, selected: selected, mediaType: mediaType }, this.renderCardContents()));
    };
    Object.defineProperty(FileCardImageView.prototype, "isImageNotReadyForDisplay", {
        get: function () {
            var _a = this.props, status = _a.status, dataURI = _a.dataURI, mediaType = _a.mediaType;
            if (dataURI) {
                return false;
            }
            return (status === 'loading' ||
                status === 'processing' ||
                isLoadingImage(mediaType, dataURI));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileCardImageView.prototype, "isCropped", {
        get: function () {
            var resizeMode = this.props.resizeMode;
            return resizeMode === 'crop';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileCardImageView.prototype, "isStretched", {
        get: function () {
            var resizeMode = this.props.resizeMode;
            return resizeMode === 'stretchy-fit';
        },
        enumerable: true,
        configurable: true
    });
    FileCardImageView.defaultProps = {
        resizeMode: 'crop',
        disableOverlay: false,
    };
    return FileCardImageView;
}(Component));
export { FileCardImageView };
export default FileCardImageView;
//# sourceMappingURL=index.js.map