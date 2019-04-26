export var FILE_LIST_UPDATE = 'FILE_LIST_UPDATE';
export function isFileListUpdateAction(action) {
    return action.type === FILE_LIST_UPDATE;
}
export function fileListUpdate(accountId, path, items, serviceName, currentCursor, nextCursor) {
    return {
        type: FILE_LIST_UPDATE,
        accountId: accountId,
        path: path,
        items: items,
        currentCursor: currentCursor,
        nextCursor: nextCursor,
        serviceName: serviceName,
    };
}
//# sourceMappingURL=fileListUpdate.js.map