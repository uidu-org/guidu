import * as tslib_1 from "tslib";
import fileClick from './fileClick';
import updatePopupUrls from './updatePopupUrls';
import fileListUpdate from './fileListUpdate';
import serviceListUpdate from './serviceListUpdate';
import accountChange from './accountChange';
import accountUnlink from './accountUnlink';
import serviceConnect from './serviceConnect';
import pathChangeRequest from './pathChangeRequest';
import fetchNextCloudFilesPage from './fetchNextCloudFilesPage';
import { getRecentFilesStarted, getRecentFilesFullfilled, getRecentFilesFailed, } from './getFilesInRecents';
import fileUploadsAdd from './fileUploadsAdd';
import filePreviewUpdate from './filePreviewUpdate';
import fileUploadProgress from './fileUploadProgress';
import fileUploadProcessingStart from './fileUploadProcessingStart';
import fileUploadEnd from './fileUploadEnd';
import setEventProxy from './setEventProxy';
import removeEventProxy from './removeEventProxy';
import resetView from './resetView';
import editorClose from './editorClose';
import editorShowError from './editorShowError';
import editorShowImage from './editorShowImage';
import editorShowLoading from './editorShowLoading';
import deselectItem from './deselectItem';
import isUploading from './isUploading';
import remoteUploadStart from './remoteUploadStart';
import { giphySearchStarted, giphySearchFullfilled, giphySearchFailed, } from './searchGiphy';
import showPopup from './showPopup';
import hidePopup from './hidePopup';
import startApp from './startApp';
import setUpfrontIdDeferred from './setUpfrontIdDeferred';
import saveCollectionItemsSubscription from './saveCollectionItemsSubscription';
import removeFileFromRecents from './removeFileFromRecents';
var reducers = combineReducers([
    fileClick,
    fileListUpdate,
    pathChangeRequest,
    fetchNextCloudFilesPage,
    serviceListUpdate,
    accountChange,
    serviceConnect,
    accountUnlink,
    getRecentFilesStarted,
    getRecentFilesFullfilled,
    getRecentFilesFailed,
    updatePopupUrls,
    fileUploadsAdd,
    filePreviewUpdate,
    fileUploadProgress,
    fileUploadProcessingStart,
    fileUploadEnd,
    setEventProxy,
    removeEventProxy,
    removeFileFromRecents,
    resetView,
    editorClose,
    editorShowError,
    editorShowImage,
    editorShowLoading,
    deselectItem,
    isUploading,
    remoteUploadStart,
    giphySearchStarted,
    giphySearchFullfilled,
    giphySearchFailed,
    showPopup,
    hidePopup,
    startApp,
    setUpfrontIdDeferred,
    saveCollectionItemsSubscription,
]);
function combineReducers(reducers) {
    return function (state, action) {
        return reducers.reduce(function (oldState, reducer) {
            return reducer(oldState, action);
        }, tslib_1.__assign({}, state));
    };
}
export default reducers;
//# sourceMappingURL=reducers.js.map