var _this = this;
import * as tslib_1 from "tslib";
import { changeAccount, isChangeServiceAction } from '../actions';
import { getConnectedRemoteAccounts } from '../actions/getConnectedRemoteAccounts';
var loggableServices = ['google', 'dropbox'];
export var changeService = function (store) { return function (next) { return function (action) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var serviceName, firstAccount, accountId;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isChangeServiceAction(action)) return [3 /*break*/, 2];
                serviceName = action.serviceName;
                if (loggableServices.indexOf(serviceName) !== -1) {
                    store.dispatch(getConnectedRemoteAccounts());
                }
                return [4 /*yield*/, store.getState().accounts];
            case 1:
                firstAccount = (_a.sent()).find(function (account) { return account.type === action.serviceName; });
                accountId = firstAccount ? firstAccount.id : '';
                store.dispatch(changeAccount(serviceName, accountId));
                _a.label = 2;
            case 2: return [2 /*return*/, next(action)];
        }
    });
}); }; }; };
//# sourceMappingURL=changeService.js.map