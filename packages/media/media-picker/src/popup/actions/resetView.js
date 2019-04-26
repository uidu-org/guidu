export var RESET_VIEW = 'RESET_VIEW';
export function isResetViewAction(action) {
    return action.type === RESET_VIEW;
}
export function resetView() {
    return {
        type: RESET_VIEW,
    };
}
//# sourceMappingURL=resetView.js.map