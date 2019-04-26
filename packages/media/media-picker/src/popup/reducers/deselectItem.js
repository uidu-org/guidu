import * as tslib_1 from "tslib";
import { isDeslectItemAction } from '../actions';
export default function deselectItem(state, action) {
    if (isDeslectItemAction(action)) {
        var selectedItems = state.selectedItems;
        if (selectedItems) {
            return tslib_1.__assign({}, state, { selectedItems: selectedItems.filter(function (item) { return item.id !== action.id; }) });
        }
    }
    return state;
}
//# sourceMappingURL=deselectItem.js.map