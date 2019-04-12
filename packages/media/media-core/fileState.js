import * as tslib_1 from "tslib";
export var isErrorFileState = function (fileState) {
    return fileState.status === 'error';
};
var apiProcessingStatusToFileStatus = function (fileStatus) {
    switch (fileStatus) {
        case 'pending':
            return 'processing';
        case 'succeeded':
            return 'processed';
        case 'failed':
            return 'failed-processing';
        case undefined:
            return 'processing';
    }
};
export var mapMediaFileToFileState = function (mediaFile) {
    console.log(mediaFile);
    var _a = mediaFile.data, id = _a.id, name = _a.name, size = _a.size, processingStatus = _a.processingStatus, artifacts = _a.artifacts, mediaType = _a.mediaType, mimeType = _a.mimeType, preview = _a.preview;
    var status = apiProcessingStatusToFileStatus(processingStatus);
    switch (processingStatus) {
        case 'pending':
        case undefined:
            return {
                id: id,
                status: status,
                name: name,
                size: size,
                mediaType: mediaType,
                mimeType: mimeType,
                preview: preview,
            };
        case 'succeeded':
            return {
                id: id,
                status: status,
                name: name,
                size: size,
                artifacts: artifacts,
                mediaType: mediaType,
                mimeType: mimeType,
                preview: preview,
            };
        case 'failed':
            return {
                id: id,
                status: status,
                name: name,
                size: size,
                artifacts: artifacts,
                mediaType: mediaType,
                mimeType: mimeType,
            };
    }
};
export var mapMediaItemToFileState = function (id, item) {
    return mapMediaFileToFileState({
        data: tslib_1.__assign({ id: id }, item),
    });
};
//# sourceMappingURL=fileState.js.map