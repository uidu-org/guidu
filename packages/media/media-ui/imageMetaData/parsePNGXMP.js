export function parseXMPMetaData(xmpMetaData) {
    var metadata = {};
    var tags = xmpMetaData.match(/<(tiff|exif):.+>/gi);
    if (tags) {
        tags.forEach(function (tag) {
            var match = tag.match(/<(tiff|exif):([^>]+)>([^<]+)/i);
            if (match) {
                var name_1 = match[2];
                metadata[name_1] = match[3];
            }
        });
    }
    return metadata;
}
//# sourceMappingURL=parsePNGXMP.js.map