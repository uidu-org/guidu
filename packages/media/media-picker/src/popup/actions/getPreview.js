export var GET_PREVIEW = 'GET_PREVIEW';
export function isGetPreviewAction(action) {
    return action.type === GET_PREVIEW;
}
export function getPreview(uploadId, file, collection) {
    return {
        type: GET_PREVIEW,
        uploadId: uploadId,
        file: file,
        collection: collection,
    };
}
//# sourceMappingURL=getPreview.js.map