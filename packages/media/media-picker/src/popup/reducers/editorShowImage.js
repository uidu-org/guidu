import * as tslib_1 from "tslib";
import { isEditorShowImageAction, } from '../actions/editorShowImage';
export default function editorShowImage(state, action) {
    if (isEditorShowImageAction(action)) {
        var editorData = state.editorData;
        var imageUrl = action.imageUrl;
        var originalFile = action.originalFile || (editorData && editorData.originalFile);
        return tslib_1.__assign({}, state, { editorData: {
                imageUrl: imageUrl,
                originalFile: originalFile,
            } });
    }
    return state;
}
//# sourceMappingURL=editorShowImage.js.map