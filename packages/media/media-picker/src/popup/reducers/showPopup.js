import * as tslib_1 from "tslib";
import { isShowPopupAction } from '../actions/showPopup';
export default function (state, action) {
    if (isShowPopupAction(action)) {
        return tslib_1.__assign({}, state, { view: tslib_1.__assign({}, state.view, { isVisible: true }) });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=showPopup.js.map