// One piece of a bitmap. Holds one texture.
var BitmapFragment = /** @class */ (function () {
    function BitmapFragment(gl, x, y, width, height, image, supplementaryCanvas) {
        this.gl = gl;
        this.position = {
            x: x,
            y: y,
            width: width,
            height: height,
            uTopLeft: 0.0,
            vTopLeft: 0.0,
            uBottomRight: 1.0,
            vBottomRight: 1.0,
        };
        this.texture = this.createTexture(image, supplementaryCanvas);
    }
    BitmapFragment.prototype.unload = function (contextLost) {
        if (!contextLost) {
            this.gl.deleteTexture(this.texture);
        }
    };
    BitmapFragment.prototype.bind = function () {
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        return true;
    };
    BitmapFragment.prototype.createTexture = function (image, supplementaryCanvas) {
        var _a = this.position, width = _a.width, height = _a.height, x = _a.x, y = _a.y;
        // Draw the fragment on the supplementary canvas
        supplementaryCanvas.width = width;
        supplementaryCanvas.height = height;
        var context = supplementaryCanvas.getContext('2d');
        context.drawImage(image, x, y, width, height, 0, 0, width, height);
        // Create the texture
        var gl = this.gl;
        var texture = gl.createTexture();
        if (!texture) {
            throw new Error('Could not create a texture');
        }
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, supplementaryCanvas);
        gl.bindTexture(gl.TEXTURE_2D, null);
        return texture;
    };
    return BitmapFragment;
}());
export { BitmapFragment };
//# sourceMappingURL=bitmapFragment.js.map