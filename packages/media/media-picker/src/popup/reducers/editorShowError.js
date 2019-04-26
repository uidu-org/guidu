import * as tslib_1 from "tslib";
import { isEditorShowErrorAction } from '../actions/editorShowError';
export default function editorShowError(state, action) {
    if (isEditorShowErrorAction(action)) {
        var editorData = state.editorData;
        var error = action.error;
        return tslib_1.__assign({}, state, { editorData: tslib_1.__assign({}, editorData, { error: error }) });
    }
    return state;
}
//# sourceMappingURL=editorShowError.js.map