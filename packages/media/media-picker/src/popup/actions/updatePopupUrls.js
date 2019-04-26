export var UPDATE_POPUP_URLS = 'UPDATE_POPUP_URLS';
export var updatePopupUrls = function (urls) {
    return {
        type: UPDATE_POPUP_URLS,
        urls: urls,
    };
};
export function isUpdatePopupUrlsAction(action) {
    return action.type === UPDATE_POPUP_URLS;
}
//# sourceMappingURL=updatePopupUrls.js.map