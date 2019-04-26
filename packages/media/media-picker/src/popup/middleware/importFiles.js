var _this = this;
import * as tslib_1 from "tslib";
import * as uuid from 'uuid/v4';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { fileStreamsCache, getMediaTypeFromMimeType, isPreviewableType, } from '@uidu/media-core';
import { isStartImportAction } from '../actions/startImport';
import { finalizeUpload } from '../actions/finalizeUpload';
import { remoteUploadStart } from '../actions/remoteUploadStart';
import { getPreview } from '../actions/getPreview';
import { handleCloudFetchingEvent } from '../actions/handleCloudFetchingEvent';
import { setEventProxy } from '../actions/setEventProxy';
import { hidePopup } from '../actions/hidePopup';
import { RECENTS_COLLECTION } from '../config';
import { RemoteUploadActivity } from '../tools/websocket/upload/remoteUploadActivity';
import { copyMediaFileForUpload } from '../../domain/file';
import { sendUploadEvent } from '../actions/sendUploadEvent';
import { setUpfrontIdDeferred } from '../actions/setUpfrontIdDeferred';
import { getPreviewFromMetadata } from '../../domain/preview';
export var isRemoteFileItem = function (item) {
    return ['dropbox', 'google', 'giphy'].indexOf(item.serviceName) !== -1;
};
export var isRemoteService = function (serviceName) {
    return ['dropbox', 'google', 'giphy'].indexOf(serviceName) !== -1;
};
var mapSelectedItemToSelectedUploadFile = function (_a, collection) {
    var id = _a.id, name = _a.name, mimeType = _a.mimeType, size = _a.size, date = _a.date, serviceName = _a.serviceName, accountId = _a.accountId, upfrontId = _a.upfrontId, _b = _a.occurrenceKey, occurrenceKey = _b === void 0 ? uuid() : _b;
    return ({
        file: {
            id: id,
            name: name,
            size: size,
            creationDate: date || Date.now(),
            type: mimeType,
            upfrontId: upfrontId,
            occurrenceKey: occurrenceKey,
        },
        serviceName: serviceName,
        accountId: accountId,
        touchFileDescriptor: {
            fileId: uuid(),
            occurrenceKey: occurrenceKey,
            collection: collection,
        },
    });
};
export function importFilesMiddleware(eventEmitter, wsProvider) {
    return function (store) { return function (next) { return function (action) {
        if (isStartImportAction(action)) {
            importFiles(eventEmitter, store, wsProvider);
        }
        return next(action);
    }; }; };
}
var getPreviewByService = function (store, serviceName, mediaType, fileId) {
    var _a = store.getState(), userContext = _a.userContext, giphy = _a.giphy;
    if (serviceName === 'giphy') {
        var selectedGiphy = giphy.imageCardModels.find(function (cardModel) { return cardModel.metadata.id === fileId; });
        if (selectedGiphy) {
            return {
                value: selectedGiphy.dataURI,
            };
        }
    }
    else if (serviceName === 'upload') {
        var observable_1 = fileStreamsCache.get(fileId);
        if (observable_1) {
            return new Promise(function (resolve) {
                var subscription = observable_1.subscribe({
                    next: function (state) {
                        if (state.status !== 'error') {
                            setTimeout(function () { return subscription.unsubscribe(); }, 0);
                            resolve(state.preview);
                        }
                    },
                });
            });
        }
    }
    else if (serviceName === 'recent_files' && isPreviewableType(mediaType)) {
        return new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var blob;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userContext.getImage(fileId, {
                            collection: RECENTS_COLLECTION,
                            width: 1920,
                            height: 1080,
                            mode: 'fit',
                        })];
                    case 1:
                        blob = _a.sent();
                        resolve({ value: blob });
                        return [2 /*return*/];
                }
            });
        }); });
    }
    return undefined;
};
export var touchSelectedFiles = function (selectedUploadFiles, store) {
    if (selectedUploadFiles.length === 0) {
        return;
    }
    var _a = store.getState(), tenantContext = _a.tenantContext, config = _a.config;
    var tenantCollection = config.uploadParams && config.uploadParams.collection;
    selectedUploadFiles.forEach(function (_a) {
        var selectedFile = _a.file, serviceName = _a.serviceName, touchFileDescriptor = _a.touchFileDescriptor;
        var id = touchFileDescriptor.fileId;
        var mediaType = getMediaTypeFromMimeType(selectedFile.type);
        var preview = getPreviewByService(store, serviceName, mediaType, selectedFile.id);
        var state = {
            id: id,
            status: 'processing',
            mediaType: mediaType,
            mimeType: selectedFile.type,
            name: selectedFile.name,
            size: selectedFile.size,
            preview: preview,
        };
        var subject = new ReplaySubject(1);
        subject.next(state);
        fileStreamsCache.set(id, subject);
    });
    var touchFileDescriptors = selectedUploadFiles.map(function (selectedUploadFile) { return selectedUploadFile.touchFileDescriptor; });
    tenantContext.file.touchFiles(touchFileDescriptors, tenantCollection);
};
export function importFiles(eventEmitter, store, wsProvider) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, uploads, selectedItems, userContext, config, tenantCollection, auth, selectedUploadFiles;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = store.getState(), uploads = _a.uploads, selectedItems = _a.selectedItems, userContext = _a.userContext, config = _a.config;
                    tenantCollection = config.uploadParams && config.uploadParams.collection;
                    store.dispatch(hidePopup());
                    return [4 /*yield*/, userContext.config.authProvider()];
                case 1:
                    auth = _b.sent();
                    selectedUploadFiles = selectedItems.map(function (item) {
                        return mapSelectedItemToSelectedUploadFile(item, tenantCollection);
                    });
                    touchSelectedFiles(selectedUploadFiles, store);
                    eventEmitter.emitUploadsStart(selectedUploadFiles.map(function (_a) {
                        var file = _a.file, touchFileDescriptor = _a.touchFileDescriptor;
                        return copyMediaFileForUpload(file, touchFileDescriptor.fileId);
                    }));
                    selectedUploadFiles.forEach(function (selectedUploadFile) {
                        var file = selectedUploadFile.file, serviceName = selectedUploadFile.serviceName, touchFileDescriptor = selectedUploadFile.touchFileDescriptor;
                        var selectedItemId = file.id;
                        if (serviceName === 'upload') {
                            var localUpload = uploads[selectedItemId];
                            var fileId = touchFileDescriptor.fileId;
                            importFilesFromLocalUpload(selectedItemId, fileId, store, localUpload, fileId);
                        }
                        else if (serviceName === 'recent_files') {
                            importFilesFromRecentFiles(selectedUploadFile, store);
                        }
                        else if (isRemoteService(serviceName)) {
                            var wsConnectionHolder = wsProvider.getWsConnectionHolder(auth);
                            importFilesFromRemoteService(selectedUploadFile, store, wsConnectionHolder);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
export var importFilesFromLocalUpload = function (selectedItemId, uploadId, store, localUpload, replaceFileId) {
    localUpload.events.forEach(function (originalEvent) {
        var event = tslib_1.__assign({}, originalEvent);
        if (event.name === 'upload-processing') {
            var file = event.data.file;
            var source = {
                id: file.id,
                collection: RECENTS_COLLECTION,
            };
            store.dispatch(finalizeUpload(file, uploadId, source, replaceFileId));
        }
        else if (event.name !== 'upload-end') {
            store.dispatch(sendUploadEvent({ event: event, uploadId: uploadId }));
        }
    });
    store.dispatch(setEventProxy(selectedItemId, uploadId));
};
export var importFilesFromRecentFiles = function (selectedUploadFile, store) {
    var file = selectedUploadFile.file, touchFileDescriptor = selectedUploadFile.touchFileDescriptor;
    var fileId = touchFileDescriptor.fileId;
    var source = {
        id: file.id,
        collection: RECENTS_COLLECTION,
    };
    store.dispatch(finalizeUpload(file, fileId, source, fileId));
    store.dispatch(getPreview(fileId, file, RECENTS_COLLECTION));
};
export var importFilesFromRemoteService = function (selectedUploadFile, store, wsConnectionHolder) {
    var touchFileDescriptor = selectedUploadFile.touchFileDescriptor, serviceName = selectedUploadFile.serviceName, accountId = selectedUploadFile.accountId, file = selectedUploadFile.file;
    var fileId = touchFileDescriptor.fileId;
    var deferredIdUpfronts = store.getState().deferredIdUpfronts;
    var deferred = deferredIdUpfronts[file.id];
    if (deferred) {
        var rejecter = deferred.rejecter, resolver = deferred.resolver;
        // We asociate the temporary file.id with the uploadId
        store.dispatch(setUpfrontIdDeferred(fileId, resolver, rejecter));
    }
    var uploadActivity = new RemoteUploadActivity(fileId, function (event, payload) {
        if (event === 'NotifyMetadata') {
            var preview = getPreviewFromMetadata(payload.metadata);
            store.dispatch(sendUploadEvent({
                event: {
                    name: 'upload-preview-update',
                    data: {
                        file: file,
                        preview: preview,
                    },
                },
                uploadId: fileId,
            }));
        }
        else {
            // TODO figure out the difference between this uploadId and the last MSW-405
            var newUploadId = payload.uploadId;
            var newFile = tslib_1.__assign({}, file, { id: newUploadId, creationDate: Date.now() });
            store.dispatch(handleCloudFetchingEvent(newFile, event, payload));
        }
    });
    uploadActivity.on('Started', function () {
        store.dispatch(remoteUploadStart(fileId));
    });
    wsConnectionHolder.openConnection(uploadActivity);
    wsConnectionHolder.send({
        type: 'fetchFile',
        params: {
            serviceName: serviceName,
            accountId: accountId,
            fileId: file.id,
            fileName: file.name,
            collection: RECENTS_COLLECTION,
            jobId: fileId,
        },
    });
};
//# sourceMappingURL=importFiles.js.map