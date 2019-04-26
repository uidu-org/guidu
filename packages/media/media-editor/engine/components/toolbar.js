import { Signal } from '../signal';
var DefaultToolbar = /** @class */ (function () {
    function DefaultToolbar(onUpdateByCore) {
        this.onUpdateByCore = onUpdateByCore;
        this.colorChanged = new Signal();
        this.lineWidthChanged = new Signal();
        this.addShadowChanged = new Signal();
        this.toolChanged = new Signal();
    }
    DefaultToolbar.prototype.unload = function () { };
    DefaultToolbar.prototype.updateByCore = function (parameters) {
        this.onUpdateByCore(parameters);
    };
    DefaultToolbar.prototype.setColor = function (color) {
        this.colorChanged.emit(color);
    };
    DefaultToolbar.prototype.setLineWidth = function (lineWidth) {
        this.lineWidthChanged.emit(lineWidth);
    };
    DefaultToolbar.prototype.setAddShadow = function (addShadow) {
        this.addShadowChanged.emit(addShadow);
    };
    DefaultToolbar.prototype.setTool = function (tool) {
        this.toolChanged.emit(tool);
    };
    return DefaultToolbar;
}());
export { DefaultToolbar };
//# sourceMappingURL=toolbar.js.map