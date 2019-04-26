import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
var MediaImage = /** @class */ (function (_super) {
    tslib_1.__extends(MediaImage, _super);
    function MediaImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MediaImage.prototype, "imgSrc", {
        get: function () {
            var _a = this.props, id = _a.id, _b = _a.mediaApiConfig, clientId = _b.clientId, token = _b.token, baseUrl = _b.baseUrl, collectionName = _a.collectionName;
            return baseUrl + "/file/" + id + "/image?client=" + clientId + "&token=" + token + (collectionName ? "&collection=" + collectionName : '');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaImage.prototype, "hasAuth", {
        get: function () {
            var _a = this.props.mediaApiConfig, clientId = _a.clientId, token = _a.token, baseUrl = _a.baseUrl;
            return !!clientId && !!token && !!baseUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaImage.prototype, "style", {
        get: function () {
            var _a = this.props, width = _a.width, height = _a.height;
            return tslib_1.__assign({}, (width && { width: width + "px" }), (height && { height: height + "px" }));
        },
        enumerable: true,
        configurable: true
    });
    MediaImage.prototype.render = function () {
        var _a = this, hasAuth = _a.hasAuth, style = _a.style, imgSrc = _a.imgSrc;
        if (!hasAuth) {
            return null;
        }
        var className = this.props.className;
        return React.createElement("img", { src: imgSrc, style: style, className: className });
    };
    return MediaImage;
}(Component));
export { MediaImage };
export default MediaImage;
//# sourceMappingURL=mediaImage.js.map