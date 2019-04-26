import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import * as dateformat from 'dateformat'; // ToDo: FIL-3207 | replace dateformat library with native solution
import * as filesize from 'filesize'; // ToDo: FIL-3208 | replace filesize library with native solution
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import { changeCloudAccountFolder } from '../../../../actions/changeCloudAccountFolder';
import { fetchNextCloudFilesPage } from '../../../../actions/fetchNextCloudFilesPage';
import AkButton from '@uidu/button';
import Spinner from '@uidu/spinner';
/* Actions */
import { fileClick } from '../../../../actions/fileClick';
import { setUpfrontIdDeferred } from '../../../../actions/setUpfrontIdDeferred';
import { isServiceFile, isServiceFolder, } from '../../../../domain';
/* Components */
import Navigation from '../../../navigation/navigation';
import { SpinnerWrapper, FolderViewerWrapper, FolderViewerRow, FileMetadataGroup, FileIcon, FileName, FileCreateDate, FileSize, MoreBtnWrapper, FolderViewerContent, SelectedFileIconWrapper, } from './styled';
import { mapMimeTypeToIcon } from '../../../../tools/mimeTypeToIcon';
var getDateString = function (timestamp) {
    if (!timestamp) {
        return '';
    }
    var todayString = new Date().toDateString();
    var itemDate = new Date(timestamp);
    var itemDateString = itemDate.toDateString();
    return dateformat(itemDate, todayString === itemDateString ? 'H:MM TT' : 'd mmm yyyy');
};
var selectedTick = (React.createElement(SelectedFileIconWrapper, null,
    React.createElement(CheckCircleIcon, { label: "check" })));
/**
 * Routing class that displays view depending on situation.
 */
var FolderViewer = /** @class */ (function (_super) {
    tslib_1.__extends(FolderViewer, _super);
    function FolderViewer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderContents = function () {
            if (_this.isPageInitialLoading) {
                return (React.createElement(SpinnerWrapper, null,
                    React.createElement(Spinner, { size: "large" })));
            }
            return _this.renderFolderContent(_this.props.items);
        };
        _this.renderServiceFolder = function (item, itemIcon) {
            return (React.createElement(FolderViewerRow, { onClick: _this.itemClicked(item), key: item.id },
                React.createElement(FileMetadataGroup, null,
                    React.createElement(FileIcon, null, itemIcon),
                    React.createElement(FileName, null, item.name))));
        };
        _this.renderServiceFile = function (serviceFile, itemIcon, isSelected) {
            var tail = isSelected
                ? selectedTick
                : _this.renderFileCreateDateAndSize(serviceFile);
            return (React.createElement(FolderViewerRow, { isSelected: isSelected, onClick: _this.itemClicked(serviceFile), key: serviceFile.id },
                React.createElement(FileMetadataGroup, null,
                    React.createElement(FileIcon, null, itemIcon),
                    React.createElement(FileName, { isSelected: isSelected }, serviceFile.name)),
                tail));
        };
        _this.renderFileCreateDateAndSize = function (_a) {
            var date = _a.date, size = _a.size;
            return (React.createElement(FileMetadataGroup, null,
                React.createElement(FileCreateDate, null, getDateString(date)),
                React.createElement(FileSize, null, filesize(size))));
        };
        _this.onLoadMoreButtonClick = function () {
            var _a = _this.props, service = _a.service, path = _a.path, nextCursor = _a.nextCursor, isLoading = _a.isLoading, onLoadMoreClick = _a.onLoadMoreClick;
            if (!isLoading) {
                onLoadMoreClick(service.name, service.accountId, path, nextCursor || '');
            }
        };
        return _this;
    }
    FolderViewer.prototype.render = function () {
        return (React.createElement(FolderViewerWrapper, null,
            React.createElement(Navigation, null),
            this.renderContents()));
    };
    Object.defineProperty(FolderViewer.prototype, "isPageInitialLoading", {
        get: function () {
            return this.props.isLoading && !this.props.currentCursor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FolderViewer.prototype, "isPageMoreLoading", {
        get: function () {
            return this.props.isLoading && this.props.currentCursor;
        },
        enumerable: true,
        configurable: true
    });
    FolderViewer.prototype.renderFolderContent = function (items) {
        var _this = this;
        if (!items) {
            return null;
        }
        var folderItems = items
            .filter(function (item) { return item.mimeType.indexOf('application/vnd.google-apps.') === -1; })
            .map(function (item) {
            var itemIcon = mapMimeTypeToIcon(item.mimeType);
            var availableIds = _this.props.selectedItems.map(function (selectedItem) { return selectedItem.id; });
            var isSelected = availableIds.indexOf(item.id) > -1;
            if (isServiceFile(item)) {
                return _this.renderServiceFile(item, itemIcon, isSelected);
            }
            else {
                return _this.renderServiceFolder(item, itemIcon);
            }
        });
        return (React.createElement(FolderViewerContent, null, [folderItems, this.renderLoadMoreButton()]));
    };
    FolderViewer.prototype.renderLoadMoreButton = function () {
        var _a = this.props, nextCursor = _a.nextCursor, isLoading = _a.isLoading;
        if (nextCursor || this.isPageMoreLoading) {
            var label = isLoading ? 'Loading...' : 'Load more';
            return (
            // Key is required as this component is used in array
            React.createElement(MoreBtnWrapper, { key: "load-more-button-wrapper" },
                React.createElement(AkButton, { className: "moreBtn", onClick: this.onLoadMoreButtonClick, isDisabled: isLoading }, label)));
        }
        else {
            return null;
        }
    };
    FolderViewer.prototype.itemClicked = function (item) {
        var _this = this;
        return function () {
            var _a = _this.props, service = _a.service, onFolderClick = _a.onFolderClick, onFileClick = _a.onFileClick;
            if (isServiceFolder(item)) {
                var path = _this.props.path.slice();
                path.push({ id: item.id, name: item.name });
                onFolderClick(service.name, service.accountId, path);
            }
            else {
                var setUpfrontIdDeferred_1 = _this.props.setUpfrontIdDeferred;
                var upfrontId = new Promise(function (resolve, reject) {
                    setUpfrontIdDeferred_1(item.id, resolve, reject);
                });
                var file = tslib_1.__assign({}, item, { upfrontId: upfrontId });
                onFileClick(service.name, service.accountId, file);
            }
        };
    };
    return FolderViewer;
}(Component));
export { FolderViewer };
export default connect(function (_a) {
    var view = _a.view, selectedItems = _a.selectedItems;
    return ({
        path: view.path,
        service: view.service,
        items: view.items,
        selectedItems: selectedItems,
        isLoading: view.isLoading,
        currentCursor: view.currentCursor,
        nextCursor: view.nextCursor,
    });
}, function (dispatch) { return ({
    onFolderClick: function (serviceName, accountId, path) {
        return dispatch(changeCloudAccountFolder(serviceName, accountId, path));
    },
    onFileClick: function (serviceName, accountId, file) {
        return dispatch(fileClick(file, serviceName, accountId));
    },
    onLoadMoreClick: function (serviceName, accountId, path, nextCursor) {
        return dispatch(fetchNextCloudFilesPage(serviceName, accountId, path, nextCursor));
    },
    setUpfrontIdDeferred: function (id, resolver, rejecter) {
        return dispatch(setUpfrontIdDeferred(id, resolver, rejecter));
    },
}); })(FolderViewer);
//# sourceMappingURL=folderView.js.map