import * as tslib_1 from "tslib";
import { TRACK_EVENT_TYPE, OPERATIONAL_EVENT_TYPE, } from '@atlaskit/analytics-gas-types';
import { isHandleCloudFetchingEventAction } from '../../actions/handleCloudFetchingEvent';
var commonPayload = {
    actionSubject: 'mediaUpload',
    actionSubjectId: 'cloudMedia',
};
var fileAttributes = function (file) { return ({
    fileSize: file.size,
    fileMimetype: file.type,
    fileSource: 'mediapicker',
}); };
export default (function (action, store) {
    if (isHandleCloudFetchingEventAction(action)) {
        var event_1 = action.event, payload = action.payload, file = action.file;
        var remoteUpload = store.getState().remoteUploads[payload.uploadId];
        var timeStarted = (remoteUpload || { timeStarted: undefined }).timeStarted;
        var uploadDurationMsec = timeStarted !== undefined ? Date.now() - timeStarted : -1;
        if (event_1 === 'RemoteUploadStart') {
            return [
                tslib_1.__assign({ action: 'commenced' }, commonPayload, { attributes: {
                        fileAttributes: fileAttributes(file),
                    }, eventType: OPERATIONAL_EVENT_TYPE }),
            ];
        }
        else if (event_1 === 'RemoteUploadEnd') {
            return [
                tslib_1.__assign({ action: 'uploaded' }, commonPayload, { attributes: {
                        fileAttributes: fileAttributes(file),
                        status: 'success',
                        uploadDurationMsec: uploadDurationMsec,
                    }, eventType: TRACK_EVENT_TYPE }),
            ];
        }
        else if (event_1 === 'RemoteUploadFail') {
            return [
                tslib_1.__assign({ action: 'uploaded' }, commonPayload, { attributes: {
                        fileAttributes: fileAttributes(file),
                        status: 'fail',
                        uploadDurationMsec: uploadDurationMsec,
                    }, eventType: TRACK_EVENT_TYPE }),
            ];
        }
        else {
            return [];
        }
    }
});
//# sourceMappingURL=handleCloudFetchingEventHandler.js.map