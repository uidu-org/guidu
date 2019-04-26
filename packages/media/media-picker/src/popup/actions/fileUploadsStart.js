export var FILE_UPLOADS_START = 'FILE_UPLOADS_START';
export function isFileUploadsStartAction(action) {
    return action.type === FILE_UPLOADS_START;
}
export function fileUploadsStart(payload) {
    return {
        type: FILE_UPLOADS_START,
        files: payload.files,
    };
}
//# sourceMappingURL=fileUploadsStart.js.map