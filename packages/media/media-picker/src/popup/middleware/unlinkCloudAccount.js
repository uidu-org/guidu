import { REQUEST_UNLINK_CLOUD_ACCOUNT, changeService, unlinkCloudAccount, } from '../actions';
export default (function (fetcher) { return function (store) { return function (next) { return function (action) {
    if (action.type === REQUEST_UNLINK_CLOUD_ACCOUNT) {
        var userContext = store.getState().userContext;
        userContext.config
            .authProvider()
            .then(function (auth) { return fetcher.unlinkCloudAccount(auth, action.account.id); })
            .then(function () {
            store.dispatch(unlinkCloudAccount(action.account));
            store.dispatch(changeService(action.account.name));
        });
    }
    return next(action);
}; }; }; });
//# sourceMappingURL=unlinkCloudAccount.js.map