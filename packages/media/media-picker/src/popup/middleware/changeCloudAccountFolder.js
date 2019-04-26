import { requestUnlinkCloudAccount, isChangeCloudAccountFolderAction, } from '../actions';
import { fileListUpdate } from '../actions/fileListUpdate';
export var changeCloudAccountFolderMiddleware = function (fetcher) { return function (store) { return function (next) { return function (action) {
    if (isChangeCloudAccountFolderAction(action)) {
        var userContext = store.getState().userContext;
        var serviceName_1 = action.serviceName, accountId_1 = action.accountId, path_1 = action.path;
        var lastPath_1 = path_1.length === 0 ? { id: '', name: '' } : path_1[path_1.length - 1];
        userContext.config
            .authProvider()
            .then(function (auth) {
            return fetcher.fetchCloudAccountFolder(auth, serviceName_1, accountId_1, lastPath_1.id);
        })
            .then(function (folder) {
            return store.dispatch(fileListUpdate(accountId_1, path_1, folder.items, serviceName_1, undefined, folder.cursor));
        })
            .catch(function (error) {
            /* TODO: Error Collector */
            if (error.response && error.response.status === 401) {
                store.dispatch(requestUnlinkCloudAccount({ id: accountId_1, name: serviceName_1 }));
            }
        });
    }
    return next(action);
}; }; }; };
//# sourceMappingURL=changeCloudAccountFolder.js.map