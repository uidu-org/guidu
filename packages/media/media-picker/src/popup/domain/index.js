export { hasLocalUploadStartedProcessing, } from './local-upload';
export var isRemoteCloudAccount = function (serviceName) {
    return serviceName === 'google' || serviceName === 'dropbox';
};
export var isServiceFolder = function (item) {
    return item.mimeType === 'application/vnd.atlassian.mediapicker.folder';
};
export var isServiceFile = function (item) {
    return item.mimeType !== 'application/vnd.atlassian.mediapicker.folder';
};
//# sourceMappingURL=index.js.map