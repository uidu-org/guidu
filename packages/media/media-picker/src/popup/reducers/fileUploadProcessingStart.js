import * as tslib_1 from "tslib";
import { isFileUploadProcessingStartAction } from '../actions/fileUploadProcessingStart';
export default function fileUploadProcessingStart(state, action) {
    if (isFileUploadProcessingStartAction(action)) {
        var uploads = tslib_1.__assign({}, state.uploads);
        if (uploads[action.file.id]) {
            uploads[action.file.id].progress = 1; // no specific UI, just setting 100% in progress
            uploads[action.file.id].events.push(action.originalEvent);
        }
        return tslib_1.__assign({}, state, { uploads: uploads });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=fileUploadProcessingStart.js.map