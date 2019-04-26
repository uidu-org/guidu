import { isSendUploadEventAction } from '../actions/sendUploadEvent';
import { copyMediaFileForUpload } from '../../domain/file';
import { handleError } from '../../util/handleError';
export default function (eventEmitter) {
    return function () { return function (next) { return function (action) {
        if (isSendUploadEventAction(action)) {
            var _a = action.payload, event_1 = _a.event, uploadId = _a.uploadId;
            switch (event_1.name) {
                case 'upload-status-update': {
                    var file = copyMediaFileForUpload(event_1.data.file, uploadId);
                    eventEmitter.emitUploadProgress(file, event_1.data.progress);
                    break;
                }
                case 'upload-preview-update': {
                    var preview = event_1.data.preview;
                    var file = copyMediaFileForUpload(event_1.data.file, uploadId);
                    eventEmitter.emitUploadPreviewUpdate(file, preview);
                    break;
                }
                case 'upload-processing': {
                    var file = copyMediaFileForUpload(event_1.data.file, uploadId);
                    eventEmitter.emitUploadProcessing(file);
                    break;
                }
                case 'upload-end': {
                    var file = copyMediaFileForUpload(event_1.data.file, uploadId);
                    eventEmitter.emitUploadEnd(file, event_1.data.public);
                    break;
                }
                case 'upload-error': {
                    var file = copyMediaFileForUpload(event_1.data.file, uploadId);
                    var error = event_1.data.error;
                    eventEmitter.emitUploadError(file, error);
                    handleError(error.name, error.description);
                    break;
                }
            }
        }
        return next(action);
    }; }; };
}
//# sourceMappingURL=sendUploadEvent.js.map