import * as tslib_1 from "tslib";
import { isResetViewAction } from '../actions';
export default function resetView(state, action) {
    if (isResetViewAction(action)) {
        var selectedItems = [];
        var oldUploads_1 = state.uploads;
        var uploads = Object.keys(oldUploads_1)
            .filter(function (uploadId) {
            var progress = oldUploads_1[uploadId].progress;
            return typeof progress === 'number' && progress < 1; // remove files that finished upload
        })
            .reduce(function (uploads, fileIdToKeep) {
            uploads[fileIdToKeep] = oldUploads_1[fileIdToKeep];
            return uploads;
        }, {});
        return tslib_1.__assign({}, state, { selectedItems: selectedItems,
            uploads: uploads });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=resetView.js.map