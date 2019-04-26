import { Signal } from '../signal';
var DefaultMouseInput = /** @class */ (function () {
    function DefaultMouseInput(inputArea, positionCalculator) {
        var _this = this;
        this.inputArea = inputArea;
        this.click = new Signal();
        this.dragStart = new Signal();
        this.dragMove = new Signal();
        this.dragEnd = new Signal();
        this.dragLost = new Signal();
        this.mouseDownListener = function (event) {
            return _this.mouseDown(event);
        };
        this.mouseMoveListener = function (event) {
            return _this.mouseMove(event);
        };
        this.mouseUpListener = function (event) { return _this.mouseUp(event); };
        this.mouseLostListener = function () { return _this.mouseLost(); };
        this.initialPosition = { x: 0, y: 0 };
        this.getPosition =
            positionCalculator || (function (event) { return _this.defaultPositionCalculator(event); });
        this.isDragging = false;
        this.isCapturingInput = false;
        this.inputArea.addEventListener('mousedown', this.mouseDownListener);
    }
    DefaultMouseInput.prototype.unload = function () {
        this.inputArea.removeEventListener('mousedown', this.mouseDownListener);
        this.interruptInputIfNecessary();
    };
    DefaultMouseInput.prototype.mouseDown = function (event) {
        if (event.button === 0) {
            // We stop propagation of the event to prevent stealing focus from the hidden textarea if there is text input.
            // Otherwise we may notice strange behavior in Firefox: when you input text and click outside the text to stop input
            // the new input is started from the position where you clicked.
            // This happens because the textarea loses the focus, the text input component reports about completed input
            // and then the new click starts new text input.
            event.stopPropagation();
            event.preventDefault();
            this.isCapturingInput = true;
            this.isDragging = false;
            this.initialPosition = this.getPosition(event);
            // We subscribe to window (not inputArea) events to get mouse input even when the mouse leaves the element
            this.subscribeToWindowEvents();
        }
    };
    DefaultMouseInput.prototype.mouseMove = function (event) {
        if (this.isCapturingInput) {
            if (!this.isDragging) {
                this.dragStart.emit(this.initialPosition);
                this.isDragging = true;
            }
            this.dragMove.emit(this.getPosition(event));
        }
    };
    DefaultMouseInput.prototype.mouseUp = function (event) {
        if (event.button === 0 && this.isCapturingInput) {
            this.unsubscribeFromWindowEvents();
            this.isCapturingInput = false;
            if (this.isDragging) {
                this.dragEnd.emit(this.getPosition(event));
                this.isDragging = false;
            }
            else {
                this.click.emit(this.initialPosition);
            }
        }
    };
    DefaultMouseInput.prototype.mouseLost = function () {
        this.interruptInputIfNecessary();
    };
    DefaultMouseInput.prototype.interruptInputIfNecessary = function () {
        if (this.isCapturingInput) {
            this.unsubscribeFromWindowEvents();
            this.isCapturingInput = false;
            if (this.isDragging) {
                this.dragLost.emit({});
            }
        }
    };
    DefaultMouseInput.prototype.subscribeToWindowEvents = function () {
        window.addEventListener('mousemove', this.mouseMoveListener);
        window.addEventListener('mouseup', this.mouseUpListener);
        window.addEventListener('blur', this.mouseLostListener);
    };
    DefaultMouseInput.prototype.unsubscribeFromWindowEvents = function () {
        window.removeEventListener('mousemove', this.mouseMoveListener);
        window.removeEventListener('mouseup', this.mouseUpListener);
        window.removeEventListener('blur', this.mouseLostListener);
    };
    DefaultMouseInput.prototype.defaultPositionCalculator = function (event) {
        var rect = this.inputArea.getBoundingClientRect();
        var x = event.pageX - rect.left - window.pageXOffset;
        var y = event.pageY - rect.top - window.pageYOffset;
        return {
            x: x / rect.width,
            y: y / rect.height,
        };
    };
    return DefaultMouseInput;
}());
export { DefaultMouseInput };
//# sourceMappingURL=mouseInput.js.map