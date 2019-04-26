import * as tslib_1 from "tslib";
import { isChangeAccountAction } from '../actions';
export default function accountChange(state, action) {
    if (isChangeAccountAction(action)) {
        var accountId = action.accountId, serviceName = action.serviceName;
        // remove loading state from view, as we only reload the recents collection when the popup is shown
        var isLoading = serviceName === 'upload' ? false : state.view.isLoading;
        return tslib_1.__assign({}, state, { view: tslib_1.__assign({}, state.view, { isLoading: isLoading, hasError: false, service: {
                    accountId: accountId,
                    name: serviceName,
                }, path: [], items: [] }) });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=accountChange.js.map