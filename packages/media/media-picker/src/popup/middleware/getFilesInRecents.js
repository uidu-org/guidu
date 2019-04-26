import { getFilesInRecentsFullfilled, getFilesInRecentsFailed, saveCollectionItemsSubscription, } from '../actions';
import { isGetFilesInRecentsAction } from '../actions/getFilesInRecents';
import { RECENTS_COLLECTION } from '../config';
export var getFilesInRecents = function () { return function (store) { return function (next) { return function (action) {
    if (isGetFilesInRecentsAction(action)) {
        requestRecentFiles(store);
    }
    return next(action);
}; }; }; };
export var requestRecentFiles = function (store) {
    var _a = store.getState(), userContext = _a.userContext, collectionItemsSubscription = _a.collectionItemsSubscription;
    if (collectionItemsSubscription) {
        collectionItemsSubscription.unsubscribe();
    }
    var subscription = userContext.collection
        .getItems(RECENTS_COLLECTION)
        .subscribe({
        next: function (items) {
            store.dispatch(getFilesInRecentsFullfilled(items));
        },
        error: function () {
            store.dispatch(getFilesInRecentsFailed());
        },
    });
    store.dispatch(saveCollectionItemsSubscription(subscription));
};
//# sourceMappingURL=getFilesInRecents.js.map