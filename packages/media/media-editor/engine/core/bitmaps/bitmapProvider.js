import * as tslib_1 from "tslib";
import { Bitmap } from './bitmap';
var defaultFragmentPosition = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    uTopLeft: 0,
    vTopLeft: 0,
    uBottomRight: 0,
    vBottomRight: 0,
};
// Now this class supports only one image
var BitmapProvider = /** @class */ (function () {
    function BitmapProvider(imageProvider, gl) {
        this.imageProvider = imageProvider;
        this.gl = gl;
        this.bitmap = null;
        this.createBitmap();
        this.fragmentPosition = tslib_1.__assign({}, defaultFragmentPosition);
    }
    BitmapProvider.prototype.unload = function () {
        this.destroyBitmap(false);
    };
    BitmapProvider.prototype.handleContextLost = function () {
        this.destroyBitmap(true);
    };
    BitmapProvider.prototype.handleContextRestored = function () {
        this.createBitmap();
    };
    BitmapProvider.prototype.createBitmap = function () {
        var _a = this.imageProvider, backImage = _a.backImage, supplementaryCanvas = _a.supplementaryCanvas;
        this.bitmap = new Bitmap(backImage, this.gl, supplementaryCanvas);
    };
    BitmapProvider.prototype.destroyBitmap = function (contextLost) {
        if (this.bitmap) {
            this.bitmap.unload(contextLost);
        }
    };
    // Gets the index of the bitmap specified by its UUID. Later a bitmap will be referenced with its index.
    // Once an index assigned to the bitmap, it cannot change during the lifetime of the bitmap provider.
    // In case of failure returns -1, 0 is a valid value.
    BitmapProvider.prototype.getBitmapIndex = function (uuid) {
        if (uuid !== this.imageProvider.backImageUuid) {
            return -1;
        }
        return 0;
    };
    // Gets the bitmap dimensions
    BitmapProvider.prototype.getBitmapWidth = function () {
        return this.bitmap ? this.bitmap.size.width : 0;
    };
    BitmapProvider.prototype.getBitmapHeight = function () {
        return this.bitmap ? this.bitmap.size.height : 0;
    };
    BitmapProvider.prototype.getNumberOfFragments = function () {
        return this.bitmap ? this.bitmap.numberOfFragments : 0;
    };
    BitmapProvider.prototype.queryFragmentCoordinates = function (_, fragmentIndex) {
        if (!this.bitmap) {
            return false;
        }
        var position = this.bitmap.getFragmentPosition(fragmentIndex);
        if (position) {
            this.fragmentPosition = position;
            return true;
        }
        else {
            this.fragmentPosition = tslib_1.__assign({}, defaultFragmentPosition);
            return false;
        }
    };
    BitmapProvider.prototype.getX = function () {
        return this.fragmentPosition.x;
    };
    BitmapProvider.prototype.getY = function () {
        return this.fragmentPosition.y;
    };
    BitmapProvider.prototype.getWidth = function () {
        return this.fragmentPosition.width;
    };
    BitmapProvider.prototype.getHeight = function () {
        return this.fragmentPosition.height;
    };
    BitmapProvider.prototype.getUTopLeft = function () {
        return this.fragmentPosition.uTopLeft;
    };
    BitmapProvider.prototype.getVTopLeft = function () {
        return this.fragmentPosition.vTopLeft;
    };
    BitmapProvider.prototype.getUBottomRight = function () {
        return this.fragmentPosition.uBottomRight;
    };
    BitmapProvider.prototype.getVBottomRight = function () {
        return this.fragmentPosition.vBottomRight;
    };
    BitmapProvider.prototype.bind = function (_, fragmentIndex) {
        if (!this.bitmap) {
            return false;
        }
        return this.bitmap.bindFragment(fragmentIndex);
    };
    return BitmapProvider;
}());
export { BitmapProvider };
//# sourceMappingURL=bitmapProvider.js.map