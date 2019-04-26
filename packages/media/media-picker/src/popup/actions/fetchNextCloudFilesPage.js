var FETCH_NEXT_CLOUD_FILES_PAGE = 'FETCH_NEXT_CLOUD_FILES_PAGE';
export function fetchNextCloudFilesPage(serviceName, accountId, path, nextCursor) {
    return {
        type: FETCH_NEXT_CLOUD_FILES_PAGE,
        serviceName: serviceName,
        accountId: accountId,
        path: path,
        nextCursor: nextCursor,
    };
}
export function isFetchNextCloudFilesPageAction(action) {
    return action.type === FETCH_NEXT_CLOUD_FILES_PAGE;
}
//# sourceMappingURL=fetchNextCloudFilesPage.js.map