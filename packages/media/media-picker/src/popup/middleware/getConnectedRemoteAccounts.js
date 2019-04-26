import { updateServiceList } from '../actions';
import { GET_CONNECTED_REMOTE_ACCOUNTS, } from '../actions/getConnectedRemoteAccounts';
var isGetConnectedRemoteAccountsAction = function (action) {
    return action.type === GET_CONNECTED_REMOTE_ACCOUNTS;
};
export var getConnectedRemoteAccounts = function (fetcher) { return function (store) { return function (next) { return function (action) {
    if (isGetConnectedRemoteAccountsAction(action)) {
        var userContext = store.getState().userContext;
        store.dispatch(updateServiceList(userContext.config
            .authProvider()
            .then(function (auth) { return fetcher.getServiceList(auth); })));
    }
    return next(action);
}; }; }; };
//# sourceMappingURL=getConnectedRemoteAccounts.js.map