export var START_FILE_BROWSER = 'START_FILE_BROWSER';
export function isStartFileBrowserAction(action) {
    return action.type === START_FILE_BROWSER;
}
export function startFileBrowser() {
    return {
        type: START_FILE_BROWSER,
    };
}
//# sourceMappingURL=startFileBrowser.js.map