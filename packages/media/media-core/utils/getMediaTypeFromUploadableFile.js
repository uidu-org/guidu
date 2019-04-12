import { getMediaTypeFromMimeType } from './getMediaTypeFromMimeType';
export var getMediaTypeFromUploadableFile = function (file) {
    if (file.content instanceof Blob) {
        var type = file.content.type;
        return getMediaTypeFromMimeType(type);
    }
    else {
        return 'unknown';
    }
};
//# sourceMappingURL=getMediaTypeFromUploadableFile.js.map