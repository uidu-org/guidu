import * as tslib_1 from "tslib";
import { isFetchNextCloudFilesPageAction } from '../actions';
export default function fetchNextPage(state, action) {
    if (isFetchNextCloudFilesPageAction(action)) {
        return tslib_1.__assign({}, state, { view: tslib_1.__assign({}, state.view, { isLoading: true, currentCursor: action.nextCursor, nextCursor: undefined }) });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=fetchNextCloudFilesPage.js.map