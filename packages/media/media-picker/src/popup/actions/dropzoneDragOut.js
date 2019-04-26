export var DROPZONE_DRAG_OUT = 'DROPZONE_DRAG_OUT';
export function isDropzoneDragOutAction(action) {
    return action.type === DROPZONE_DRAG_OUT;
}
export function dropzoneDragOut(fileCount) {
    return {
        type: DROPZONE_DRAG_OUT,
        fileCount: fileCount,
    };
}
//# sourceMappingURL=dropzoneDragOut.js.map