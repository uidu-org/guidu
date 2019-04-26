export var DROPZONE_DROP_IN = 'DROPZONE_DROP_IN';
export function isDropzoneDropInAction(action) {
    return action.type === DROPZONE_DROP_IN;
}
export function dropzoneDropIn(fileCount) {
    return {
        type: DROPZONE_DROP_IN,
        fileCount: fileCount,
    };
}
//# sourceMappingURL=dropzoneDropIn.js.map