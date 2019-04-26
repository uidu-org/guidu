export var EDIT_REMOTE_IMAGE = 'EDIT_REMOTE_IMAGE';
export function isEditRemoteImageAction(action) {
    return action.type === EDIT_REMOTE_IMAGE;
}
export function editRemoteImage(item, collectionName) {
    return {
        type: EDIT_REMOTE_IMAGE,
        item: item,
        collectionName: collectionName,
    };
}
//# sourceMappingURL=editRemoteImage.js.map