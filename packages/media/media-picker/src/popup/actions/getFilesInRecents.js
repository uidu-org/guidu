export var GET_FILES_IN_RECENTS = 'GET_FILES_IN_RECENTS';
export var isGetFilesInRecentsAction = function (action) {
    return action.type === GET_FILES_IN_RECENTS;
};
export var getFilesInRecents = function () {
    return {
        type: GET_FILES_IN_RECENTS,
    };
};
export var GET_FILES_IN_RECENTS_FULLFILLED = 'GET_FILES_IN_RECENTS_FULLFILLED';
export var isGetFilesInRecentsFullfilledAction = function (action) {
    return action.type === GET_FILES_IN_RECENTS_FULLFILLED;
};
export function getFilesInRecentsFullfilled(items) {
    return {
        type: GET_FILES_IN_RECENTS_FULLFILLED,
        items: items,
    };
}
export var GET_FILES_IN_RECENTS_FAILED = 'GET_FILES_IN_RECENTS_FAILED';
export var isGetFilesInRecentsFailedAction = function (action) {
    return action.type === GET_FILES_IN_RECENTS_FAILED;
};
export function getFilesInRecentsFailed() {
    return {
        type: GET_FILES_IN_RECENTS_FAILED,
    };
}
//# sourceMappingURL=getFilesInRecents.js.map