import { Signal } from '../signal';
// The default implementation of ShapeDeleter interface.
// Accepts a hidden text area that receives text input when activated.
// When "delete" or "backspace" is pressed, it emits the deleteShape signal
var DefaultShapeDeleter = /** @class */ (function () {
    function DefaultShapeDeleter(hTextArea) {
        var _this = this;
        this.hTextArea = hTextArea;
        this.deleteShape = new Signal();
        this.keyDownListener = function (event) {
            return _this.keyDown(event);
        };
        this.isDeleteEnabled = false;
        this.hTextArea.addEventListener('keydown', this.keyDownListener);
    }
    DefaultShapeDeleter.prototype.unload = function () {
        this.hTextArea.removeEventListener('keydown', this.keyDownListener);
    };
    DefaultShapeDeleter.prototype.deleteEnabled = function () {
        this.hTextArea.style.visibility = 'visible';
        this.hTextArea.focus();
        this.isDeleteEnabled = true;
    };
    DefaultShapeDeleter.prototype.deleteDisabled = function () {
        this.hTextArea.style.visibility = 'hidden';
        this.hTextArea.value = '';
        this.isDeleteEnabled = false;
    };
    DefaultShapeDeleter.prototype.keyDown = function (event) {
        if (!this.isDeleteEnabled) {
            return;
        }
        var isDeletePressed = event.key === 'Delete' || event.which === 46;
        var isBackspacePressed = event.key === 'Backspace' || event.which === 8;
        if (isDeletePressed || isBackspacePressed) {
            this.deleteShape.emit({});
        }
    };
    return DefaultShapeDeleter;
}());
export { DefaultShapeDeleter };
//# sourceMappingURL=shapeDeleter.js.map