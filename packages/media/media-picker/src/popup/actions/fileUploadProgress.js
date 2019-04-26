export var FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';
export function isFileUploadProgressAction(action) {
    return action.type === FILE_UPLOAD_PROGRESS;
}
export function fileUploadProgress(payload) {
    return {
        type: FILE_UPLOAD_PROGRESS,
        file: payload.file,
        progress: payload.progress.portion,
        originalEvent: {
            name: 'upload-status-update',
            data: payload,
        },
    };
}
//# sourceMappingURL=fileUploadProgress.js.map