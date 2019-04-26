import * as tslib_1 from "tslib";
import { isFileUploadEndAction } from '../actions/fileUploadEnd';
export default function fileUploadEnd(state, action) {
    if (isFileUploadEndAction(action)) {
        var uploads = tslib_1.__assign({}, state.uploads);
        if (uploads[action.file.id]) {
            uploads[action.file.id].progress = null; // clearing progress will remove progress UI
            uploads[action.file.id].events.push(action.originalEvent);
        }
        return tslib_1.__assign({}, state, { uploads: uploads });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=fileUploadEnd.js.map