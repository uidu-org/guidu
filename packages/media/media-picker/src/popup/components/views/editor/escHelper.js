/**
 * Subscribes to the window 'keydown' event, calls escHandler when ESC is pressed.
 * Call unload() to unsubscribe from the window event.
 */
var EscHelper = /** @class */ (function () {
    function EscHelper(escHandler) {
        var _this = this;
        this.escHandler = escHandler;
        this.keyDownListener = function (event) { return _this.onKeyDown(event); };
        window.addEventListener('keydown', this.keyDownListener);
        window.focus();
    }
    EscHelper.prototype.teardown = function () {
        window.removeEventListener('keydown', this.keyDownListener);
    };
    EscHelper.prototype.onKeyDown = function (event) {
        if (event.key === 'Escape' || event.which === 27) {
            this.escHandler();
        }
    };
    return EscHelper;
}());
export { EscHelper };
//# sourceMappingURL=escHelper.js.map