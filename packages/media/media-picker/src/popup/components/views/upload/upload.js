import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Card, } from '@uidu/media-card';
import { getMediaTypeFromMimeType, } from '@uidu/media-core';
import Spinner from '@uidu/spinner';
import Flag, { FlagGroup } from '@atlaskit/flag';
import AnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import EditorInfoIcon from '@atlaskit/icon/glyph/error';
import { FormattedMessage, injectIntl } from 'react-intl';
import ModalDialog, { ModalTransition } from '@uidu/modal-dialog';
import { messages, InfiniteScroll } from '@uidu/media-ui';
import { isWebGLAvailable } from '../../../tools/webgl';
import { Dropzone } from './dropzone';
import { fileClick } from '../../../actions/fileClick';
import { editorShowImage } from '../../../actions/editorShowImage';
import { editRemoteImage } from '../../../actions/editRemoteImage';
import { setUpfrontIdDeferred } from '../../../actions/setUpfrontIdDeferred';
import { menuDelete, menuEdit } from '../editor/phrases';
import { Wrapper, SpinnerWrapper, LoadingNextPageWrapper, CardsWrapper, RecentUploadsTitle, CardWrapper, } from './styled';
import { RECENTS_COLLECTION } from '../../../config';
import { removeFileFromRecents } from '../../../actions/removeFileFromRecents';
var createEditCardAction = function (handler, label) {
    return {
        label: label,
        handler: handler,
        icon: React.createElement(AnnotateIcon, { label: menuEdit, size: "medium" }),
    };
};
var createDeleteCardAction = function (handler) {
    return {
        label: menuDelete,
        handler: handler,
        icon: React.createElement(TrashIcon, { label: menuDelete, size: "medium" }),
    };
};
var cardDimension = { width: 162, height: 108 };
var StatelessUploadView = /** @class */ (function (_super) {
    tslib_1.__extends(StatelessUploadView, _super);
    function StatelessUploadView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hasPopupBeenVisible: false,
            isWebGLWarningFlagVisible: false,
            shouldDismissWebGLWarningFlag: false,
            isLoadingNextPage: false,
        };
        _this.renderDeleteConfirmation = function () {
            var deletionCandidate = _this.state.deletionCandidate;
            var removeFileFromRecents = _this.props.removeFileFromRecents;
            var closeDialog = function () {
                _this.setState({ deletionCandidate: undefined });
            };
            if (deletionCandidate) {
                var id_1 = deletionCandidate.id, occurrenceKey_1 = deletionCandidate.occurrenceKey, userFileId_1 = deletionCandidate.userFileId;
                var actions = [
                    {
                        text: 'Delete permanently',
                        onClick: function () {
                            removeFileFromRecents(id_1, occurrenceKey_1, userFileId_1);
                            closeDialog();
                        },
                    },
                    {
                        text: 'Cancel',
                        onClick: function () {
                            closeDialog();
                        },
                    },
                ];
                return (React.createElement(ModalTransition, null,
                    React.createElement(ModalDialog, { width: "small", appearance: "danger", heading: "Delete forever?", actions: actions, onClose: closeDialog }, "This file is about to be permanently deleted. Once you delete, it's gone for good.")));
            }
            return null;
        };
        _this.onThresholdReachedListener = function () {
            var isLoadingNextPage = _this.state.isLoadingNextPage;
            if (isLoadingNextPage) {
                return;
            }
            _this.setState({ isLoadingNextPage: true }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var context;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, , 2, 3]);
                            context = this.props.context;
                            return [4 /*yield*/, context.collection.loadNextPage(RECENTS_COLLECTION)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            this.setState({ isLoadingNextPage: false });
                            return [7 /*endfinally*/];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.renderLoadingView = function () {
            return (React.createElement(SpinnerWrapper, null,
                React.createElement(Spinner, { size: "large" })));
        };
        _this.renderLoadingNextPageView = function () {
            var isLoadingNextPage = _this.state.isLoadingNextPage;
            // We want to always render LoadingNextPageWrapper regardless of the next page loading or not
            // to keep the same wrapper height, this prevents jumping when interacting with the infinite scroll
            return (React.createElement(LoadingNextPageWrapper, null, isLoadingNextPage && React.createElement(Spinner, null)));
        };
        _this.renderRecentsView = function (cards) {
            var isWebGLWarningFlagVisible = _this.state.isWebGLWarningFlagVisible;
            return (React.createElement("div", null,
                React.createElement(RecentUploadsTitle, null,
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages.recent_uploads))),
                React.createElement(CardsWrapper, null, cards),
                _this.renderLoadingNextPageView(),
                isWebGLWarningFlagVisible && _this.renderWebGLWarningFlag()));
        };
        _this.renderWebGLWarningFlag = function () {
            var formatMessage = _this.props.intl.formatMessage;
            return (React.createElement(FlagGroup, { onDismissed: _this.onFlagDismissed },
                React.createElement(Flag, { shouldDismiss: _this.state.shouldDismissWebGLWarningFlag, description: formatMessage(messages.webgl_warning_description), icon: React.createElement(EditorInfoIcon, { label: "info" }), id: "webgl-warning-flag", title: formatMessage(messages.unable_to_annotate_image), actions: [
                        {
                            content: formatMessage(messages.learn_more),
                            onClick: _this.onLearnMoreClicked,
                        },
                    ] })));
        };
        _this.onFlagDismissed = function () {
            _this.setState({ isWebGLWarningFlagVisible: false });
        };
        _this.onLearnMoreClicked = function () {
            _this.setState({ shouldDismissWebGLWarningFlag: true });
            _this.onFlagDismissed();
            window.open('https://get.webgl.org/');
        };
        return _this;
    }
    StatelessUploadView.prototype.render = function () {
        var _a = this.props, isLoading = _a.isLoading, mpBrowser = _a.mpBrowser;
        var cards = this.renderCards();
        var isEmpty = !isLoading && cards.length === 0;
        var contentPart = null;
        if (isLoading) {
            contentPart = this.renderLoadingView();
        }
        else if (!isEmpty) {
            contentPart = this.renderRecentsView(cards);
        }
        var confirmationDialog = this.renderDeleteConfirmation();
        return (React.createElement(InfiniteScroll, { height: "100%", onThresholdReached: this.onThresholdReachedListener },
            React.createElement(Wrapper, null,
                React.createElement(Dropzone, { isEmpty: isEmpty, mpBrowser: mpBrowser }),
                contentPart,
                confirmationDialog)));
    };
    StatelessUploadView.prototype.onAnnotateActionClick = function (callback) {
        var _this = this;
        return function () {
            if (isWebGLAvailable()) {
                callback();
            }
            else {
                _this.showWebGLWarningFlag();
            }
        };
    };
    StatelessUploadView.prototype.renderCards = function () {
        var recentFilesCards = this.recentFilesCards();
        var uploadingFilesCards = this.uploadingFilesCards();
        return uploadingFilesCards
            .concat(recentFilesCards)
            .map(function (_a) {
            var key = _a.key, card = _a.el;
            return (React.createElement(CardWrapper, { tabIndex: 0, className: "e2e-recent-upload-card", key: key }, card));
        });
    };
    StatelessUploadView.prototype.uploadingFilesCards = function () {
        var _this = this;
        var _a = this.props, uploads = _a.uploads, onFileClick = _a.onFileClick, context = _a.context;
        var itemsKeys = Object.keys(uploads);
        itemsKeys.sort(function (a, b) {
            return uploads[b].index - uploads[a].index;
        });
        var selectedUploadIds = this.props.selectedItems
            .filter(function (item) { return item.serviceName === 'upload'; })
            .map(function (item) { return item.id; });
        return itemsKeys.map(function (key) {
            var item = _this.props.uploads[key];
            var file = item.file;
            var mediaType = getMediaTypeFromMimeType(file.metadata.mimeType);
            var fileMetadata = tslib_1.__assign({}, file.metadata, { mimeType: mediaType });
            var id = fileMetadata.id, userOccurrenceKey = fileMetadata.userOccurrenceKey, userUpfrontId = fileMetadata.userUpfrontId, size = fileMetadata.size, name = fileMetadata.name, upfrontId = fileMetadata.upfrontId;
            var selected = selectedUploadIds.indexOf(id) > -1;
            var serviceFile = {
                id: id,
                mimeType: mediaType,
                name: name,
                size: size,
                upfrontId: upfrontId,
                occurrenceKey: fileMetadata.occurrenceKey,
                date: 0,
            };
            var onClick = function () { return onFileClick(serviceFile, 'upload'); };
            var actions = [
                createDeleteCardAction(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var userFileId, occurrenceKey;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, userUpfrontId];
                            case 1:
                                userFileId = _a.sent();
                                return [4 /*yield*/, userOccurrenceKey];
                            case 2:
                                occurrenceKey = _a.sent();
                                this.setState({
                                    deletionCandidate: { id: id, occurrenceKey: occurrenceKey, userFileId: userFileId },
                                });
                                return [2 /*return*/];
                        }
                    });
                }); }),
            ]; // TODO [MS-1017]: allow file annotation for uploading files
            var identifier = {
                id: userUpfrontId,
                mediaItemType: 'file',
            };
            return {
                key: id,
                el: (React.createElement(Card, { context: context, identifier: identifier, dimensions: cardDimension, selectable: true, selected: selected, onClick: onClick, actions: actions })),
            };
        });
    };
    StatelessUploadView.prototype.recentFilesCards = function () {
        var _this = this;
        var _a = this.props, context = _a.context, recents = _a.recents, recentsCollection = _a.recentsCollection, selectedItems = _a.selectedItems, onFileClick = _a.onFileClick, onEditRemoteImage = _a.onEditRemoteImage, setUpfrontIdDeferred = _a.setUpfrontIdDeferred, formatMessage = _a.intl.formatMessage;
        var items = recents.items;
        var selectedRecentFiles = selectedItems
            .filter(function (item) { return item.serviceName === 'recent_files'; })
            .map(function (item) { return item.id; });
        var onClick = function (_a) {
            var mediaItemDetails = _a.mediaItemDetails;
            var fileDetails = mediaItemDetails;
            if (fileDetails) {
                var id_2 = fileDetails.id;
                var upfrontId = new Promise(function (resolve, reject) {
                    setUpfrontIdDeferred(id_2, resolve, reject);
                });
                onFileClick({
                    id: id_2,
                    date: 0,
                    name: fileDetails.name || '',
                    mimeType: fileDetails.mimeType || '',
                    size: fileDetails.size || 0,
                    upfrontId: upfrontId,
                }, 'recent_files');
            }
        };
        var editHandler = function (mediaItem) {
            if (mediaItem && mediaItem.type === 'file') {
                var _a = mediaItem.details, id = _a.id, name_1 = _a.name;
                if (isWebGLAvailable()) {
                    onEditRemoteImage({
                        id: id,
                        name: name_1 || '',
                    }, recentsCollection);
                }
                else {
                    // WebGL not available - show warning flag
                    _this.showWebGLWarningFlag();
                }
            }
        };
        return items.map(function (item) {
            var id = item.id, occurrenceKey = item.occurrenceKey, details = item.details;
            var selected = selectedRecentFiles.indexOf(id) > -1;
            var actions = [
                createDeleteCardAction(function () {
                    _this.setState({ deletionCandidate: { id: id, occurrenceKey: occurrenceKey } });
                }),
            ];
            if (details.mediaType === 'image') {
                actions.unshift(createEditCardAction(editHandler, formatMessage(messages.annotate)));
            }
            return {
                key: occurrenceKey + "-" + id,
                el: (React.createElement(Card, { context: context, identifier: {
                        id: id,
                        mediaItemType: 'file',
                        collectionName: recentsCollection,
                    }, dimensions: cardDimension, selectable: true, selected: selected, onClick: onClick, actions: actions })),
            };
        });
    };
    StatelessUploadView.prototype.showWebGLWarningFlag = function () {
        this.setState({ isWebGLWarningFlagVisible: true });
    };
    return StatelessUploadView;
}(Component));
export { StatelessUploadView };
var mapStateToProps = function (state) { return ({
    isLoading: state.view.isLoading,
    recents: state.recents,
    uploads: state.uploads,
    selectedItems: state.selectedItems,
}); };
var mapDispatchToProps = function (dispatch) { return ({
    onFileClick: function (serviceFile, serviceName) {
        return dispatch(fileClick(serviceFile, serviceName));
    },
    onEditorShowImage: function (file, dataUri) {
        return dispatch(editorShowImage(dataUri, file));
    },
    onEditRemoteImage: function (file, collectionName) {
        return dispatch(editRemoteImage(file, collectionName));
    },
    setUpfrontIdDeferred: function (id, resolver, rejecter) {
        return dispatch(setUpfrontIdDeferred(id, resolver, rejecter));
    },
    removeFileFromRecents: function (id, occurrenceKey, userFileId) {
        return dispatch(removeFileFromRecents(id, occurrenceKey, userFileId));
    },
}); };
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(StatelessUploadView));
//# sourceMappingURL=upload.js.map