import { isImageRemote } from '@uidu/media-core';
export var urlImageLoader = function (url) {
    return new Promise(function (resolve, reject) {
        var img = document.createElement('img');
        // For more details: https://webglfundamentals.org/webgl/lessons/webgl-cors-permission.html
        if (isImageRemote(url)) {
            img.crossOrigin = '';
        }
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function () {
            reject(new Error("Can't load image with url: " + url));
        };
        img.src = url;
    });
};
var DefaultImageProvider = /** @class */ (function () {
    function DefaultImageProvider(backImage, supplementaryCanvas) {
        this.backImage = backImage;
        this.supplementaryCanvas = supplementaryCanvas;
    }
    DefaultImageProvider.create = function (imageLoader, supplementaryCanvas) {
        return imageLoader().then(function (img) { return new DefaultImageProvider(img, supplementaryCanvas); });
    };
    Object.defineProperty(DefaultImageProvider.prototype, "backImageUuid", {
        get: function () {
            return 'default';
        },
        enumerable: true,
        configurable: true
    });
    DefaultImageProvider.prototype.unload = function () { };
    return DefaultImageProvider;
}());
export { DefaultImageProvider };
//# sourceMappingURL=imageProvider.js.map