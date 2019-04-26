export var FILE_UPLOAD_PROCESSING_START = 'FILE_UPLOAD_PROCESSING_START';
export function isFileUploadProcessingStartAction(action) {
    return action.type === FILE_UPLOAD_PROCESSING_START;
}
export function fileUploadProcessingStart(payload) {
    return {
        type: FILE_UPLOAD_PROCESSING_START,
        file: payload.file,
        originalEvent: {
            name: 'upload-processing',
            data: payload,
        },
    };
}
//# sourceMappingURL=fileUploadProcessingStart.js.map