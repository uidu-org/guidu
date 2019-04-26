export function copyMediaFileForUpload(_a, fileId) {
    var name = _a.name, size = _a.size, creationDate = _a.creationDate, type = _a.type, upfrontId = _a.upfrontId, userUpfrontId = _a.userUpfrontId, occurrenceKey = _a.occurrenceKey, userOccurrenceKey = _a.userOccurrenceKey;
    // We dont' use spread here because user upload events are not sanitized
    return {
        id: fileId,
        name: name,
        size: size,
        creationDate: creationDate,
        type: type,
        upfrontId: upfrontId,
        userUpfrontId: userUpfrontId,
        occurrenceKey: occurrenceKey,
        userOccurrenceKey: userOccurrenceKey,
    };
}
//# sourceMappingURL=file.js.map