import * as tslib_1 from "tslib";
import { isUpdatePopupUrlsAction } from '../actions/updatePopupUrls';
export default function updatePopupUrls(state, action) {
    if (isUpdatePopupUrlsAction(action)) {
        var urls = action.urls;
        return tslib_1.__assign({}, state, urls);
    }
    return state;
}
//# sourceMappingURL=updatePopupUrls.js.map