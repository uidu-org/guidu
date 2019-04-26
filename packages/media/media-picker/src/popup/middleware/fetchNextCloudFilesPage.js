import { isFetchNextCloudFilesPageAction, fileListUpdate, requestUnlinkCloudAccount, } from '../actions';
export var fetchNextCloudFilesPageMiddleware = function (fetcher) { return function (store) { return function (next) { return function (action) {
    if (isFetchNextCloudFilesPageAction(action)) {
        var userContext = store.getState().userContext;
        var serviceName_1 = action.serviceName, accountId_1 = action.accountId, path_1 = action.path;
        var folderId_1 = (path_1[path_1.length - 1] || { id: '' }).id;
        var view = store.getState().view;
        var cursor_1 = view && view.nextCursor;
        var items_1 = (view && view.items) || [];
        userContext.config
            .authProvider()
            .then(function (auth) {
            return fetcher.fetchCloudAccountFolder(auth, serviceName_1, accountId_1, folderId_1, cursor_1);
        })
            .then(function (folder) {
            return store.dispatch(fileListUpdate(accountId_1, path_1, items_1.concat(folder.items), serviceName_1, cursor_1, folder.cursor));
        })
            .catch(function (error) {
            /* TODO: error collector */
            if (error.response && error.response.status === 401) {
                store.dispatch(requestUnlinkCloudAccount({ id: accountId_1, name: serviceName_1 }));
            }
        });
    }
    return next(action);
}; }; }; };
//# sourceMappingURL=fetchNextCloudFilesPage.js.map