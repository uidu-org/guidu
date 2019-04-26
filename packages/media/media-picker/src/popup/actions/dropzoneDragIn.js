export var DROPZONE_DRAG_IN = 'DROPZONE_DRAG_IN';
export function isDropzoneDragInAction(action) {
    return action.type === DROPZONE_DRAG_IN;
}
export function dropzoneDragIn(fileCount) {
    return {
        type: DROPZONE_DRAG_IN,
        fileCount: fileCount,
    };
}
//# sourceMappingURL=dropzoneDragIn.js.map