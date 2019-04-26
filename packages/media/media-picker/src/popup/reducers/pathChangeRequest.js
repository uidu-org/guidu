import * as tslib_1 from "tslib";
import { isChangeCloudAccountFolderAction } from '../actions';
export default function pathChangeRequest(state, action) {
    if (isChangeCloudAccountFolderAction(action)) {
        var view = tslib_1.__assign({}, state.view, {
            isLoading: true,
            path: action.path,
            currentCursor: undefined,
            nextCursor: undefined,
        });
        return tslib_1.__assign({}, state, { view: view });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=pathChangeRequest.js.map