export var FILE_UPLOAD_END = 'FILE_UPLOAD_END';
export function isFileUploadEndAction(action) {
    return action.type === FILE_UPLOAD_END;
}
export function fileUploadEnd(payload) {
    return {
        type: FILE_UPLOAD_END,
        file: payload.file,
        publicFile: payload.public,
        originalEvent: {
            name: 'upload-end',
            data: payload,
        },
    };
}
//# sourceMappingURL=fileUploadEnd.js.map