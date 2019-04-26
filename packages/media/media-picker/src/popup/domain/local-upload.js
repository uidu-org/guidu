export function hasLocalUploadStartedProcessing(localUpload) {
    return localUpload.events.some(function (event) { return event.name === 'upload-processing'; });
}
//# sourceMappingURL=local-upload.js.map