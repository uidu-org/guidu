import * as deepEqual from 'deep-equal';
export var isFileIdentifier = function (identifier) {
    return identifier.mediaItemType === 'file';
};
export var isExternalImageIdentifier = function (identifier) {
    return identifier.mediaItemType === 'external-image';
};
export var isDifferentIdentifier = function (a, b) {
    if (isFileIdentifier(a) && isFileIdentifier(b)) {
        return (a.id !== b.id ||
            a.collectionName !== b.collectionName ||
            a.occurrenceKey !== b.occurrenceKey);
    }
    else {
        return !deepEqual(a, b);
    }
};
//# sourceMappingURL=identifier.js.map