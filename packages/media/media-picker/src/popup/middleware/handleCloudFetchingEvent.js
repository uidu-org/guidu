import * as tslib_1 from "tslib";
import { SmartMediaProgress } from '../../domain/progress';
import { finalizeUpload } from '../actions/finalizeUpload';
import { HANDLE_CLOUD_FETCHING_EVENT, } from '../actions/handleCloudFetchingEvent';
import { RECENTS_COLLECTION } from '../config';
import { sendUploadEvent } from '../actions/sendUploadEvent';
import { setUpfrontIdDeferred } from '../actions/setUpfrontIdDeferred';
var isCloudFetchingEventAction = function (action) {
    return action.type === HANDLE_CLOUD_FETCHING_EVENT;
};
var isRemoteUploadProgressAction = function (action) {
    return action.event === 'RemoteUploadProgress';
};
var isRemoteUploadEndAction = function (action) {
    return action.event === 'RemoteUploadEnd';
};
var isRemoteUploadFailAction = function (action) {
    return action.event === 'RemoteUploadFail';
};
export var handleCloudFetchingEvent = function (store) { return function (next) { return function (action) {
    // Handle cloud upload progress
    var handleRemoteUploadProgressMessage = function (file, data) {
        var portion = data.bytes / data.fileSize;
        var progress = new SmartMediaProgress(file.size, file.size * portion, file.creationDate, Date.now());
        store.dispatch(sendUploadEvent({
            event: {
                name: 'upload-status-update',
                data: {
                    file: file,
                    progress: progress.toJSON(),
                },
            },
            uploadId: data.uploadId,
        }));
    };
    // Handle cloud upload end
    var handleRemoteUploadEndMessage = function (file, data) {
        var deferredIdUpfronts = store.getState().deferredIdUpfronts;
        var uploadId = data.uploadId, fileId = data.fileId;
        var deferred = deferredIdUpfronts[uploadId];
        var source = {
            id: fileId,
            collection: RECENTS_COLLECTION,
        };
        var uploadedFile = tslib_1.__assign({}, file, { id: fileId });
        if (deferred) {
            var rejecter = deferred.rejecter, resolver = deferred.resolver;
            // We asociate the uploadId with the public fileId on the user collection
            store.dispatch(setUpfrontIdDeferred(fileId, resolver, rejecter));
        }
        store.dispatch(finalizeUpload(uploadedFile, uploadId, source, file.id));
    };
    // Handle cloud upload fail
    var handleRemoteUploadFailMessage = function (file, data) {
        store.dispatch(sendUploadEvent({
            event: {
                name: 'upload-error',
                data: {
                    file: file,
                    error: {
                        fileId: data.uploadId,
                        name: 'remote_upload_fail',
                        description: data.description,
                    },
                },
            },
            uploadId: data.uploadId,
        }));
    };
    if (isCloudFetchingEventAction(action)) {
        if (isRemoteUploadProgressAction(action)) {
            handleRemoteUploadProgressMessage(action.file, action.payload);
        }
        else if (isRemoteUploadEndAction(action)) {
            handleRemoteUploadEndMessage(action.file, action.payload);
        }
        else if (isRemoteUploadFailAction(action)) {
            handleRemoteUploadFailMessage(action.file, action.payload);
        }
    }
    return next(action);
}; }; };
//# sourceMappingURL=handleCloudFetchingEvent.js.map