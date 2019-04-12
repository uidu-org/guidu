export var getMediaTypeFromMimeType = function (type) {
    if (type.indexOf('image/') === 0) {
        return 'image';
    }
    else if (type.indexOf('video/') === 0) {
        return 'video';
    }
    else if (type.indexOf('audio/') === 0) {
        return 'audio';
    }
    else if (type.indexOf('application/pdf') === 0) {
        return 'doc';
    }
    else {
        return 'unknown';
    }
};
//# sourceMappingURL=getMediaTypeFromMimeType.js.map