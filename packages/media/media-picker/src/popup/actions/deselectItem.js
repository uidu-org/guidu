export var DESELECT_ITEM = 'DESELECT_ITEM';
export function isDeslectItemAction(action) {
    return action.type === DESELECT_ITEM;
}
export function deselectItem(fileId) {
    return {
        type: DESELECT_ITEM,
        id: fileId,
    };
}
//# sourceMappingURL=deselectItem.js.map