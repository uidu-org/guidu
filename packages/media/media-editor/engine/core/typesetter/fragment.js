// Part of a text. Contains two alpha textures:
//   - normal for the text itself,
//   - stroke for the outline.
//
// A fragment owns its textures: when it is unloaded it must release its textures.
var Fragment = /** @class */ (function () {
    function Fragment(gl, normal, stroke, position) {
        this.gl = gl;
        this.normal = normal;
        this.stroke = stroke;
        this.position = position;
    }
    Fragment.prototype.unload = function (isContextLost) {
        if (!isContextLost) {
            var gl = this.gl;
            gl.deleteTexture(this.normal);
            gl.deleteTexture(this.stroke);
        }
    };
    Fragment.prototype.bindNormal = function () {
        return this.bindTexture(this.normal);
    };
    Fragment.prototype.bindStroke = function () {
        return this.bindTexture(this.stroke);
    };
    Fragment.prototype.bindTexture = function (texture) {
        if (!texture) {
            return false;
        }
        var gl = this.gl;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return true;
    };
    return Fragment;
}());
export { Fragment };
//# sourceMappingURL=fragment.js.map