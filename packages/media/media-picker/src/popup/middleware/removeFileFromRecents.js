import { isRemoveFileFromRecentsAction } from '../actions/removeFileFromRecents';
import { RECENTS_COLLECTION } from '../config';
export var removeFileFromRecents = function (store) { return function (next) { return function (action) {
    if (isRemoveFileFromRecentsAction(action)) {
        store
            .getState()
            .userContext.collection.removeFile(action.userFileId || action.id, RECENTS_COLLECTION, action.occurrenceKey);
    }
    return next(action);
}; }; };
//# sourceMappingURL=removeFileFromRecents.js.map