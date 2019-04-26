import * as tslib_1 from "tslib";
import { isStartAppAction } from '../actions/startApp';
export default function (state, action) {
    if (isStartAppAction(action)) {
        return tslib_1.__assign({}, state, { onCancelUpload: action.payload.onCancelUpload });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=startApp.js.map