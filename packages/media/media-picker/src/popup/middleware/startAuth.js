import { updateServiceList, START_AUTH } from '../actions';
import { changeAccount } from '../actions/changeAccount';
export var startCloudAccountOAuthFlow = function (fetcher, cloudService) { return function (store) { return function (next) { return function (action) {
    if (action.type === START_AUTH) {
        var _a = store.getState(), redirectUrl = _a.redirectUrl, userContext_1 = _a.userContext;
        var serviceName_1 = action.serviceName;
        var accounts = cloudService
            .startAuth(redirectUrl, serviceName_1)
            .then(function () { return userContext_1.config.authProvider(); })
            .then(function (auth) { return fetcher.getServiceList(auth); });
        store.dispatch(updateServiceList(accounts));
        accounts.then(function (accounts) {
            var selectedAccount = accounts.find(function (account) { return account.type === serviceName_1; });
            if (selectedAccount) {
                store.dispatch(changeAccount(serviceName_1, selectedAccount.id));
            }
        });
    }
    return next(action);
}; }; }; };
//# sourceMappingURL=startAuth.js.map