import * as tslib_1 from "tslib";
import { UPDATE_SERVICE_LIST } from '../actions';
export default function serviceListUpdate(state, action) {
    if (action.type === UPDATE_SERVICE_LIST) {
        return tslib_1.__assign({}, state, { accounts: action.accounts });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=serviceListUpdate.js.map