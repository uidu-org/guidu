import * as tslib_1 from "tslib";
import { isFileUploadsStartAction } from '../actions/fileUploadsStart';
export default function fileUploadsAdd(state, action) {
    if (isFileUploadsStartAction(action)) {
        var uploads = state.uploads, selectedItems = state.selectedItems, lastUploadIndex = state.lastUploadIndex;
        var files = action.files;
        var newUploads_1 = {};
        var newLastUploadIndex_1 = lastUploadIndex;
        files.forEach(function (_a) {
            var id = _a.id, name = _a.name, type = _a.type, size = _a.size, upfrontId = _a.upfrontId, userUpfrontId = _a.userUpfrontId, userOccurrenceKey = _a.userOccurrenceKey, occurrenceKey = _a.occurrenceKey;
            if (userUpfrontId && userOccurrenceKey) {
                newUploads_1[id] = {
                    file: {
                        metadata: {
                            id: id,
                            name: name,
                            mimeType: type,
                            size: size,
                            upfrontId: upfrontId,
                            userUpfrontId: userUpfrontId,
                            userOccurrenceKey: userOccurrenceKey,
                            occurrenceKey: occurrenceKey,
                        },
                    },
                    timeStarted: Date.now(),
                    progress: 0,
                    events: [],
                    index: newLastUploadIndex_1++,
                };
            }
        });
        var newSelectedItems = files.map(function (_a) {
            var id = _a.id, name = _a.name, type = _a.type, size = _a.size, upfrontId = _a.upfrontId, occurrenceKey = _a.occurrenceKey;
            return ({
                date: 0,
                id: id,
                upfrontId: upfrontId,
                occurrenceKey: occurrenceKey,
                mimeType: type,
                name: name,
                parentId: '',
                size: size,
                serviceName: 'upload',
            });
        });
        return tslib_1.__assign({}, state, { uploads: tslib_1.__assign({}, uploads, newUploads_1), selectedItems: tslib_1.__spread(selectedItems, newSelectedItems), lastUploadIndex: newLastUploadIndex_1 });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=fileUploadsAdd.js.map