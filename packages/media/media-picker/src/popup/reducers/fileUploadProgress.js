import * as tslib_1 from "tslib";
import { isFileUploadProgressAction } from '../actions/fileUploadProgress';
export default function fileUploadProgress(state, action) {
    if (isFileUploadProgressAction(action)) {
        var uploads = tslib_1.__assign({}, state.uploads);
        if (uploads[action.file.id]) {
            uploads[action.file.id].progress = action.progress;
            uploads[action.file.id].events.push(action.originalEvent);
        }
        return tslib_1.__assign({}, state, { uploads: uploads });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=fileUploadProgress.js.map