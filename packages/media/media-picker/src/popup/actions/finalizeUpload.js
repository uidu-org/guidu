export var FINALIZE_UPLOAD = 'FINALIZE_UPLOAD';
export function isFinalizeUploadAction(action) {
    return action.type === FINALIZE_UPLOAD;
}
export function finalizeUpload(file, uploadId, source, replaceFileId) {
    return {
        type: FINALIZE_UPLOAD,
        file: file,
        uploadId: uploadId,
        source: source,
        replaceFileId: replaceFileId,
    };
}
//# sourceMappingURL=finalizeUpload.js.map