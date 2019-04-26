import * as tslib_1 from "tslib";
import { isFileUploadPreviewUpdateAction } from '../actions/fileUploadPreviewUpdate';
export default function filePreviewUpdate(state, action) {
    if (isFileUploadPreviewUpdateAction(action)) {
        // this event is not going to be recorded or sent to main window (you can't pass blobs)
        var uploads = tslib_1.__assign({}, state.uploads);
        if (uploads[action.file.id]) {
            uploads[action.file.id].file.blob = action.preview;
            uploads[action.file.id].events.push(action.originalEvent);
        }
        return tslib_1.__assign({}, state, { uploads: uploads });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=filePreviewUpdate.js.map