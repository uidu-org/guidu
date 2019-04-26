import * as tslib_1 from "tslib";
import * as React from 'react';
import { ImageWrapper } from './styled';
import { isImageRemote } from '@uidu/media-core';
// TODO: i18n https://product-fabric.atlassian.net/browse/MS-1261
export var IMAGE_ERRORS = {
    BAD_URL: 'Invalid image url',
    LOAD_FAIL: 'Image failed to load',
};
var ImagePlacerImage = /** @class */ (function (_super) {
    tslib_1.__extends(ImagePlacerImage, _super);
    function ImagePlacerImage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onLoad = function (e) {
            var image = e.currentTarget;
            var width = image.naturalWidth, height = image.naturalHeight;
            _this.props.onLoad(image, width, height);
        };
        _this.onError = function () {
            _this.props.onError(IMAGE_ERRORS.LOAD_FAIL);
        };
        return _this;
    }
    ImagePlacerImage.prototype.componentWillMount = function () {
        var _a = this.props, src = _a.src, onError = _a.onError;
        if (src !== undefined) {
            try {
                isImageRemote(src);
            }
            catch (e) {
                onError(IMAGE_ERRORS.BAD_URL);
            }
        }
    };
    ImagePlacerImage.prototype.render = function () {
        var _a = this.props, src = _a.src, x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        if (src) {
            try {
                var crossOrigin = isImageRemote(src) ? 'anonymous' : undefined;
                return (React.createElement(ImageWrapper, { src: src, x: x, y: y, crossOrigin: crossOrigin, width: width, height: height, onLoad: this.onLoad, onError: this.onError, draggable: false }));
            }
            catch (e) {
                return null;
            }
        }
        return null;
    };
    return ImagePlacerImage;
}(React.Component));
export { ImagePlacerImage };
//# sourceMappingURL=image.js.map