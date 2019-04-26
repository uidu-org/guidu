import * as tslib_1 from "tslib";
import { isEditorCloseAction } from '../actions';
export default function editorClose(state, action) {
    if (isEditorCloseAction(action)) {
        return tslib_1.__assign({}, state, { editorData: undefined });
    }
    return state;
}
//# sourceMappingURL=editorClose.js.map