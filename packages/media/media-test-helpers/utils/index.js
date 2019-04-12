export function mapDataUriToBlob(dataUri) {
    var match = dataUri.match(/^data:([a-z]+\/[a-z\+]+)(?:;)?(.*)?,(.*)/);
    if (match) {
        var mediaType = match[1], data = match[3];
        return new Blob([decodeURIComponent(data)], { type: mediaType });
    }
    else {
        throw new Error("Could not parse data uri: " + dataUri);
    }
}
//# sourceMappingURL=index.js.map