// This file is copied verbatim from /Users/achamas/ms/atlaskit-mk-2/packages/media/media-core/src/utils/isImageRemote.ts
// as part of https://product-fabric.atlassian.net/browse/MSW-479
// Returns true if you need to set crossorigin property of an img element.
export var isImageRemote = function (imageUrl, windowOrigin) {
    if (windowOrigin === void 0) { windowOrigin = window.location.origin; }
    if (URL && URL.prototype) {
        var url = new URL(imageUrl);
        if (!url.host) {
            // This is a local resource. Safari will fail to load it if we set crossorigin
            return false;
        }
        return url.origin !== windowOrigin;
    }
    else {
        // IE doesn't have support to 'new URL'.
        // But it can load local and remote images with crossorigin set.
        return true;
    }
};
//# sourceMappingURL=isImageRemote.js.map