import { Signal } from '../signal';
var DefaultDrawingArea = /** @class */ (function () {
    function DefaultDrawingArea(canvas, size, backgroundColor) {
        this.canvas = canvas;
        this.size = size;
        this.backgroundColor = backgroundColor;
        this.resize = new Signal();
        this.setCanvasSize();
    }
    Object.defineProperty(DefaultDrawingArea.prototype, "outputSize", {
        get: function () {
            return this.size;
        },
        enumerable: true,
        configurable: true
    });
    DefaultDrawingArea.prototype.unload = function () { };
    DefaultDrawingArea.prototype.setSize = function (size) {
        this.size = size;
        this.setCanvasSize();
        this.resize.emit(size);
    };
    DefaultDrawingArea.prototype.setCanvasSize = function () {
        this.canvas.width = this.size.width;
        this.canvas.height = this.size.height;
    };
    return DefaultDrawingArea;
}());
export { DefaultDrawingArea };
//# sourceMappingURL=drawingArea.js.map