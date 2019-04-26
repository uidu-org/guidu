import { Signal } from '../signal';
var ContextHolder = /** @class */ (function () {
    function ContextHolder(drawingArea) {
        var _this = this;
        this.contextLost = new Signal();
        this.contextRestored = new Signal();
        this.contextLostListener = function () { return _this.contextLost.emit({}); };
        this.canvas = drawingArea.canvas;
        this.gl = ContextHolder.getContext(this.canvas);
        this.contextRestoredListener = function () {
            _this.contextRestored.emit(drawingArea.outputSize);
        };
        this.canvas.addEventListener('webglcontextlost', this.contextLostListener);
        this.canvas.addEventListener('webglcontextrestored', this.contextRestoredListener);
    }
    ContextHolder.prototype.unload = function () {
        this.canvas.removeEventListener('webglcontextlost', this.contextLostListener);
        this.canvas.removeEventListener('webglcontextrestored', this.contextRestoredListener);
    };
    ContextHolder.getContext = function (canvas) {
        return (canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl'));
    };
    return ContextHolder;
}());
export { ContextHolder };
//# sourceMappingURL=contextHolder.js.map