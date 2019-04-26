import { TRACK_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
import { isFileUploadEndAction } from '../../actions/fileUploadEnd';
export default (function (action, store) {
    if (isFileUploadEndAction(action)) {
        var file = action.file, publicFile = action.publicFile;
        var timeStarted = store.getState().uploads[file.id].timeStarted;
        return [
            {
                action: 'uploaded',
                actionSubject: 'mediaUpload',
                actionSubjectId: 'localMedia',
                attributes: {
                    fileAttributes: {
                        fileMediatype: publicFile.mediaType,
                        fileState: publicFile.processingStatus,
                        fileStatus: publicFile.artifacts &&
                            Object.keys(publicFile.artifacts).length > 0
                            ? 'original'
                            : 'converted',
                        fileSize: publicFile.size,
                        fileMimetype: publicFile.mimeType,
                        fileSource: 'mediapicker',
                    },
                    status: 'success',
                    uploadDurationMsec: timeStarted !== undefined ? Date.now() - timeStarted : -1,
                },
                eventType: TRACK_EVENT_TYPE,
            },
        ];
    }
});
//# sourceMappingURL=fileUploadEndHandler.js.map