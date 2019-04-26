import * as tslib_1 from "tslib";
import { SAVE_COLLECTION_ITEMS_SUBSCRIPTION, } from '../actions';
export default function saveCollectionItemsSubscription(state, action) {
    if (action.type === SAVE_COLLECTION_ITEMS_SUBSCRIPTION) {
        return tslib_1.__assign({}, state, { collectionItemsSubscription: action.subscription });
    }
    else {
        return state;
    }
}
//# sourceMappingURL=saveCollectionItemsSubscription.js.map