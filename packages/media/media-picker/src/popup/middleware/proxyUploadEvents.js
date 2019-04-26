import * as tslib_1 from "tslib";
import { uploadHasProxy } from '../tools/uploadHasProxy';
import { finalizeUpload } from '../actions/finalizeUpload';
import { RECENTS_COLLECTION } from '../config';
import { sendUploadEvent } from '../actions/sendUploadEvent';
export var proxyUploadEvents = function (store) { return function (next) { return function (action) {
    if ([
        'FILE_PREVIEW_UPDATE',
        'FILE_UPLOAD_PROGRESS',
        'FILE_UPLOAD_PROCESSING_START',
        'FILE_UPLOAD_END',
        'FILE_UPLOAD_ERROR',
    ].indexOf(action.type) > -1) {
        var uploads = store.getState().uploads;
        var file = action.file, originalEvent = action.originalEvent;
        if (file) {
            var upload = uploads[file.id];
            if (upload && upload.proxy && uploadHasProxy(upload)) {
                var event_1 = tslib_1.__assign({}, originalEvent);
                upload.proxy.forEach(function (uploadId) {
                    if (event_1.name === 'upload-processing') {
                        var localFile = event_1.data.file;
                        var source = {
                            id: localFile.id,
                            collection: RECENTS_COLLECTION,
                        };
                        store.dispatch(finalizeUpload(localFile, uploadId, source, uploadId));
                    }
                    else if (event_1.name !== 'upload-end') {
                        // TODO: MSW-376 upload-status-update events from the user has a public Id that should be sanitized here.
                        store.dispatch(sendUploadEvent({ event: event_1, uploadId: uploadId }));
                    }
                });
            }
        }
    }
    return next(action);
}; }; };
//# sourceMappingURL=proxyUploadEvents.js.map