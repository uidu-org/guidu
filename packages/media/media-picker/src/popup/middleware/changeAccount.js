import { isChangeAccountAction } from '../actions/changeAccount';
import { changeCloudAccountFolder } from '../actions/changeCloudAccountFolder';
import { isRemoteCloudAccount } from '../domain';
export default (function (store) { return function (next) { return function (action) {
    if (isChangeAccountAction(action)) {
        var serviceName = action.serviceName, accountId = action.accountId;
        if (isRemoteCloudAccount(serviceName) && accountId !== '') {
            store.dispatch(changeCloudAccountFolder(serviceName, accountId, []));
        }
    }
    return next(action);
}; }; });
//# sourceMappingURL=changeAccount.js.map