export var CHANGE_CLOUD_ACCOUNT_FOLDER = 'CHANGE_CLOUD_ACCOUNT_FOLDER';
export function changeCloudAccountFolder(serviceName, accountId, path) {
    return {
        type: CHANGE_CLOUD_ACCOUNT_FOLDER,
        serviceName: serviceName,
        accountId: accountId,
        path: path,
    };
}
export function isChangeCloudAccountFolderAction(action) {
    return action.type === CHANGE_CLOUD_ACCOUNT_FOLDER;
}
//# sourceMappingURL=changeCloudAccountFolder.js.map