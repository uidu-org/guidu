import * as tslib_1 from "tslib";
import { EDITOR_SHOW_LOADING } from '../actions/editorShowLoading';
export default function editorShowLoading(state, action) {
    if (action.type === EDITOR_SHOW_LOADING) {
        return tslib_1.__assign({}, state, { editorData: { originalFile: action.originalFile } });
    }
    return state;
}
//# sourceMappingURL=editorShowLoading.js.map