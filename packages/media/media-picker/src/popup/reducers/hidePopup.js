import * as tslib_1 from "tslib";
import { isHidePopupAction } from '../actions/hidePopup';
export default function (state, action) {
    if (isHidePopupAction(action)) {
        return tslib_1.__assign({}, state, { view: tslib_1.__assign({}, state.view, { isVisible: false }) });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=hidePopup.js.map