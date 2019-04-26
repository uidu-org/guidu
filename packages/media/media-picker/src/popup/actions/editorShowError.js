export var EDITOR_SHOW_ERROR = 'EDITOR_SHOW_ERROR';
export function isEditorShowErrorAction(action) {
    return action.type === EDITOR_SHOW_ERROR;
}
export function editorShowError(message, retryHandler) {
    return {
        type: EDITOR_SHOW_ERROR,
        error: {
            message: message,
            retryHandler: retryHandler,
        },
    };
}
//# sourceMappingURL=editorShowError.js.map