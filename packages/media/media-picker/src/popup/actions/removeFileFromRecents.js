export var REMOVE_FILES_FROM_RECENTS = 'REMOVE_FILES_FROM_RECENTS';
export var isRemoveFileFromRecentsAction = function (action) {
    return action.type === REMOVE_FILES_FROM_RECENTS;
};
export var removeFileFromRecents = function (id, occurrenceKey, userFileId) {
    return {
        type: REMOVE_FILES_FROM_RECENTS,
        id: id,
        userFileId: userFileId,
        occurrenceKey: occurrenceKey,
    };
};
//# sourceMappingURL=removeFileFromRecents.js.map