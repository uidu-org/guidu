export var HIDE_POPUP = 'HIDE_POPUP';
export function isHidePopupAction(action) {
    return action.type === HIDE_POPUP;
}
export function hidePopup() {
    return {
        type: HIDE_POPUP,
    };
}
//# sourceMappingURL=hidePopup.js.map