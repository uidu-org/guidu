export var SHOW_POPUP = 'SHOW_POPUP';
export function isShowPopupAction(action) {
    return action.type === SHOW_POPUP;
}
export function showPopup() {
    return {
        type: SHOW_POPUP,
    };
}
//# sourceMappingURL=showPopup.js.map