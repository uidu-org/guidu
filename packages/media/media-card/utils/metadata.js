export var extendMetadata = function (state, metadata) {
    var id = state.id;
    var currentMediaType = metadata && metadata.mediaType;
    if (state.status !== 'error') {
        return {
            id: id,
            name: state.name,
            size: state.size,
            mimeType: state.mimeType,
            mediaType: currentMediaType && currentMediaType !== 'unknown'
                ? currentMediaType
                : state.mediaType,
        };
    }
    else {
        return {
            id: id,
        };
    }
};
//# sourceMappingURL=metadata.js.map