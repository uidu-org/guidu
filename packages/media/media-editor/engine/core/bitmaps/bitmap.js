import { BitmapFragment } from './bitmapFragment';
// Holds a bitmap from the bitmap provider. Each bitmap consists of several fragments (textures)
var Bitmap = /** @class */ (function () {
    function Bitmap(img, gl, supplementaryCanvas) {
        this.size = { width: img.width, height: img.height };
        var maxSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        this.fragments = this.splitToFragments(img, gl, supplementaryCanvas, maxSize);
    }
    Bitmap.prototype.unload = function (contextLost) {
        this.fragments.forEach(function (fragment) { return fragment.unload(contextLost); });
    };
    Object.defineProperty(Bitmap.prototype, "numberOfFragments", {
        get: function () {
            return this.fragments.length;
        },
        enumerable: true,
        configurable: true
    });
    Bitmap.prototype.getFragmentPosition = function (fragmentIndex) {
        return this.applyToFragment(fragmentIndex, function (fragment) { return fragment.position; }, null);
    };
    Bitmap.prototype.bindFragment = function (fragmentIndex) {
        return this.applyToFragment(fragmentIndex, function (fragment) { return fragment.bind(); }, false);
    };
    // Generic method to perform an action on a fragment specified by the index
    // If no fragment is found, the 'notFound' value is returned
    Bitmap.prototype.applyToFragment = function (fragmentIndex, action, notFound) {
        if (fragmentIndex < 0 || fragmentIndex >= this.fragments.length) {
            return notFound;
        }
        return action(this.fragments[fragmentIndex]);
    };
    Bitmap.prototype.splitToFragments = function (img, gl, supplementaryCanvas, maxSize) {
        var fragments = [];
        var _a = this.size, width = _a.width, height = _a.height;
        for (var x = 0; x < width; x += maxSize) {
            for (var y = 0; y < height; y += maxSize) {
                var xMax = Math.min(x + maxSize, width);
                var yMax = Math.min(y + maxSize, height);
                var fragmentWidth = xMax - x;
                var fragmentHeight = yMax - y;
                var fragment = new BitmapFragment(gl, x, y, fragmentWidth, fragmentHeight, img, supplementaryCanvas);
                fragments.push(fragment);
            }
        }
        return fragments;
    };
    return Bitmap;
}());
export { Bitmap };
//# sourceMappingURL=bitmap.js.map