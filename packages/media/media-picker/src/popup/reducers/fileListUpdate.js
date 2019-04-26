import * as tslib_1 from "tslib";
import { FILE_LIST_UPDATE } from '../actions';
import { pathsEqual } from '../tools/pathsEqual';
export default function fileListUpdate(state, action) {
    if (action.type === FILE_LIST_UPDATE) {
        if (pathsEqual(action.path, state.view.path) &&
            action.accountId === state.view.service.accountId &&
            state.view.currentCursor === action.currentCursor) {
            return tslib_1.__assign({}, state, { view: tslib_1.__assign({}, state.view, { items: action.items, isLoading: false, currentCursor: action.currentCursor, nextCursor: action.nextCursor }) });
        }
    }
    return state;
}
//# sourceMappingURL=fileListUpdate.js.map