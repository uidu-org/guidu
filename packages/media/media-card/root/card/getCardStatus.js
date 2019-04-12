// we don't want to show complete status for empty files, ideally there should be no such file on the media api,
// but there are some edge cases when using id upfront that can result on that.
export var getCardStatus = function (state, props) {
    var status = state.status, metadata = state.metadata, dataURI = state.dataURI;
    var identifier = props.identifier, disableOverlay = props.disableOverlay;
    if (identifier.mediaItemType !== 'file') {
        return status;
    }
    if (metadata) {
        var _a = metadata, size = _a.size, mediaType = _a.mediaType, name_1 = _a.name;
        if (mediaType === 'image' || mediaType === 'video') {
            if (status === 'complete' && !dataURI) {
                return 'processing';
            }
        }
        else if (name_1 && size && !disableOverlay && status === 'processing') {
            // If we have enough metadata for non images, we show it
            return 'complete';
        }
        else if (status === 'complete' && !size) {
            return 'processing';
        }
    }
    return status;
};
//# sourceMappingURL=getCardStatus.js.map