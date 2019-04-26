import { UI_EVENT_TYPE, } from '@atlaskit/analytics-gas-types';
import fileUploadEndHandler from './fileUploadEndHandler';
import fileUploadErrorHandler from './fileUploadErrorHandler';
import fileUploadsStartHandler from './fileUploadsStartHandler';
import handleCloudFetchingEventHandler from './handleCloudFetchingEventHandler';
import editorCloseHandler from './editorCloseHandler';
import editRemoteImageHandler from './editRemoteImageHandler';
import changeServiceHandler from './changeServiceHandler';
import hidePopupHandler from './hidePopupHandler';
import startAuthHandler from './startAuthHandler';
import startFileBrowserHandler from './startFileBrowserHandler';
import fileListUpdateHandler from './fileListUpdateHandler';
import searchGiphyHandler from './searchGiphyHandler';
import editorShowImageHandler from './editorShowImageHandler';
import showPopupHandler from './showPopupHandler';
export var buttonClickPayload = {
    action: 'clicked',
    actionSubject: 'button',
    eventType: UI_EVENT_TYPE,
};
export default [
    fileUploadEndHandler,
    fileUploadErrorHandler,
    fileUploadsStartHandler,
    handleCloudFetchingEventHandler,
    editorCloseHandler,
    editRemoteImageHandler,
    changeServiceHandler,
    hidePopupHandler,
    startAuthHandler,
    startFileBrowserHandler,
    fileListUpdateHandler,
    searchGiphyHandler,
    editorShowImageHandler,
    showPopupHandler,
];
//# sourceMappingURL=index.js.map