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