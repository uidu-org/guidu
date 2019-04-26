import { TRACK_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isFileUploadErrorAction } from '../../actions/fileUploadError';
export default (function (action, store) {
    if (isFileUploadErrorAction(action)) {
        var uploadFile = action.file;
        var currentUploads = store.getState().uploads;
        var timeStarted = currentUploads[uploadFile.id].timeStarted;
        return [
            {
                action: 'uploaded',
                actionSubject: 'mediaUpload',
                actionSubjectId: 'localMedia',
                attributes: {
                    fileAttributes: {
                        fileSize: uploadFile.size,
                        fileSource: 'mediapicker',
                    },
                    status: 'fail',
                    failReason: action.error.description,
                    uploadDurationMsec: timeStarted !== undefined ? Date.now() - timeStarted : -1,
                },
                eventType: TRACK_EVENT_TYPE,
            },
        ];
    }
});
//# sourceMappingURL=fileUploadErrorHandler.js.map