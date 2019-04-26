export var FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
export function isFileUploadErrorAction(action) {
    return action.type === FILE_UPLOAD_ERROR;
}
export function fileUploadError(payload) {
    return {
        type: FILE_UPLOAD_ERROR,
        file: payload.file,
        error: payload.error,
        originalEvent: {
            name: 'upload-error',
            data: payload,
        },
    };
}
//# sourceMappingURL=fileUploadError.js.map