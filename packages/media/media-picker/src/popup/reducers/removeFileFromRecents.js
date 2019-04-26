import * as tslib_1 from "tslib";
import { isRemoveFileFromRecentsAction } from '../actions/removeFileFromRecents';
export default function removeFileFromRecents(state, action) {
    if (isRemoveFileFromRecentsAction(action)) {
        var selectedItems = state.selectedItems.filter(function (item) { return item.id !== action.id; });
        var uploadIdsToDelete = Object.keys(state.uploads).filter(function (uploadId) { return state.uploads[uploadId].file.metadata.id === action.id; });
        var uploads_1 = tslib_1.__assign({}, state.uploads);
        uploadIdsToDelete.forEach(function (uploadId) {
            delete uploads_1[uploadId];
        });
        return tslib_1.__assign({}, state, { selectedItems: selectedItems,
            uploads: uploads_1 });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=removeFileFromRecents.js.map