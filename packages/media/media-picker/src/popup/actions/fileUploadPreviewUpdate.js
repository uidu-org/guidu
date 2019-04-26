export var FILE_PREVIEW_UPDATE = 'FILE_PREVIEW_UPDATE';
export function isFileUploadPreviewUpdateAction(action) {
    return action.type === FILE_PREVIEW_UPDATE;
}
export function fileUploadPreviewUpdate(payload) {
    return {
        type: FILE_PREVIEW_UPDATE,
        file: payload.file,
        preview: payload.preview.file,
        originalEvent: {
            name: 'upload-preview-update',
            data: payload,
        },
    };
}
//# sourceMappingURL=fileUploadPreviewUpdate.js.map