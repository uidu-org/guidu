import * as tslib_1 from "tslib";
import { UNLINK_ACCOUNT } from '../actions';
export default function (state, action) {
    if (action.type === UNLINK_ACCOUNT) {
        var accounts = state.accounts.then(function (accounts) {
            return accounts.slice().filter(function (account) { return account.id !== action.account.id; });
        });
        return tslib_1.__assign({}, state, { accounts: accounts });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=accountUnlink.js.map