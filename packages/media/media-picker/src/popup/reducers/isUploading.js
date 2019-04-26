import * as tslib_1 from "tslib";
import { isStartImportAction, isResetViewAction, isHidePopupAction, } from '../actions';
export function isUploading(state, action) {
    if (state === void 0) { state = false; }
    if (isStartImportAction(action)) {
        return true;
    }
    else if (isResetViewAction(action)) {
        return false;
    }
    else {
        return state;
    }
}
export function isCancelling(state, action) {
    if (state === void 0) { state = false; }
    if (isHidePopupAction(action)) {
        return true;
    }
    else if (isResetViewAction(action)) {
        return false;
    }
    else {
        return state;
    }
}
export default function (state, action) {
    var nextState = tslib_1.__assign({}, state, { view: tslib_1.__assign({}, state.view) });
    var hasChanged = false;
    nextState.view.isUploading = isUploading(state.view.isUploading, action);
    if (nextState.view.isUploading !== state.view.isUploading) {
        hasChanged = true;
    }
    nextState.view.isCancelling = isCancelling(state.view.isCancelling, action);
    if (nextState.view.isCancelling !== state.view.isCancelling) {
        hasChanged = true;
    }
    return hasChanged ? nextState : state;
}
// this would be nicer:
// import {combineReducers} from 'redux';
// export default combineReducers({
//   isUploading,
//   isCancelling
// });
//# sourceMappingURL=isUploading.js.map