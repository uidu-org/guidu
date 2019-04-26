import { Signal } from '../signal';
import { getUtf32Codes } from '../../util';
// Conversion of special key codes to input commands
var inputCommands = {
    27: 'complete',
    8: 'backspace',
    13: 'newline',
    46: 'delete',
    40: 'down',
    38: 'up',
    37: 'left',
    39: 'right',
};
// The default implementation of KeyboardInput interface.
// Accepts a hidden text area which will receive text input.
// The hidden text area should have 'hidden' visibility, but not 'display: none'.
var DefaultKeyboardInput = /** @class */ (function () {
    function DefaultKeyboardInput(hTextArea, supplementaryCanvas, textHelperDiv) {
        var _this = this;
        this.hTextArea = hTextArea;
        this.supplementaryCanvas = supplementaryCanvas;
        this.textHelperDiv = textHelperDiv;
        this.characterPressed = new Signal();
        this.inputCommand = new Signal();
        this.inputListener = function () { return _this.input(); };
        this.compositionStartListener = function () { return _this.compositionStart(); };
        this.compositionEndListener = function () { return _this.compositionEnd(); };
        this.keyUpListener = function () { return _this.keyUp(); };
        this.keyDownListener = function (event) {
            return _this.keyDown(event);
        };
        this.blurListener = function () { return _this.blur(); };
        this.isInputActive = false;
        this.isComposing = false;
        this.readCompositionResultOnKeyUp = false;
        this.subscribeToTextAreaEvents();
    }
    DefaultKeyboardInput.prototype.unload = function () {
        this.unsubscribeFromTextAreaEvents();
    };
    DefaultKeyboardInput.prototype.startInput = function () {
        // Called by the core when it is ready to accept text input
        this.isInputActive = true;
        this.hTextArea.style.visibility = 'visible';
        this.acquireFocus();
    };
    DefaultKeyboardInput.prototype.endInput = function () {
        // Called by the core when it no longer needs text input
        this.isInputActive = false;
        this.isComposing = false;
        this.readCompositionResultOnKeyUp = false;
        this.hTextArea.style.visibility = 'hidden';
    };
    DefaultKeyboardInput.prototype.subscribeToTextAreaEvents = function () {
        var hTextArea = this.hTextArea;
        hTextArea.addEventListener('input', this.inputListener);
        hTextArea.addEventListener('compositionstart', this.compositionStartListener);
        hTextArea.addEventListener('compositionend', this.compositionEndListener);
        hTextArea.addEventListener('keyup', this.keyUpListener);
        hTextArea.addEventListener('keydown', this.keyDownListener);
        hTextArea.addEventListener('blur', this.blurListener);
    };
    DefaultKeyboardInput.prototype.unsubscribeFromTextAreaEvents = function () {
        var hTextArea = this.hTextArea;
        hTextArea.removeEventListener('input', this.inputListener);
        hTextArea.removeEventListener('compositionstart', this.compositionStartListener);
        hTextArea.removeEventListener('compositionend', this.compositionEndListener);
        hTextArea.removeEventListener('keyup', this.keyUpListener);
        hTextArea.removeEventListener('keydown', this.keyDownListener);
        hTextArea.removeEventListener('blur', this.blurListener);
    };
    DefaultKeyboardInput.prototype.input = function () {
        // Composition starts when the IME panel (for Chinese, Japanese, etc.) appears.
        // In this case the input is necessary for this panel to choose the correct hieroglyph, not for us.
        // We should read characters only when there is no composition.
        if (!this.isComposing) {
            this.passText();
        }
    };
    DefaultKeyboardInput.prototype.compositionStart = function () {
        // We will get this notification when the IME panel (for Chinese, Japanese, etc.) appears.
        // At this point there is no input for us to pass to the core.
        this.isComposing = true;
        this.readCompositionResultOnKeyUp = false;
    };
    DefaultKeyboardInput.prototype.compositionEnd = function () {
        // We get this notification when the IME panel disappears
        this.isComposing = false;
        // In Safari at this point the value of the hidden text area contains the original text, not composed.
        // Thus we'll catch the updated text in keyup. For that we set readCompositionResultOnKeyUp to true.
        // All tested browsers fire keyup after compositionend.
        this.readCompositionResultOnKeyUp = true;
    };
    DefaultKeyboardInput.prototype.keyUp = function () {
        // The only purpose of listening to this event is to get the composition result
        if (this.readCompositionResultOnKeyUp) {
            this.passText();
            this.readCompositionResultOnKeyUp = false;
        }
    };
    DefaultKeyboardInput.prototype.keyDown = function (event) {
        var command = inputCommands[event.which || event.keyCode];
        if (command) {
            event.stopPropagation();
            event.preventDefault();
            this.inputCommand.emit(command);
        }
    };
    DefaultKeyboardInput.prototype.blur = function () {
        if (this.isInputActive) {
            // If our text area is blurred, we try to restore the focus.
            // If we can't do this, we inform the core that the input has been completed (this.acquireFocus() does this).
            this.acquireFocus();
        }
    };
    DefaultKeyboardInput.prototype.acquireFocus = function () {
        this.hTextArea.focus();
        // If we can't get the focus we inform the core that the input is complete.
        // The core will call endInput() automatically
        if (document.activeElement !== this.hTextArea) {
            this.inputCommand.emit('complete');
        }
    };
    DefaultKeyboardInput.prototype.passText = function () {
        var _this = this;
        var text = this.hTextArea.value;
        if (text) {
            getUtf32Codes(text).forEach(function (code) { return _this.characterPressed.emit(code); });
            this.hTextArea.value = '';
        }
    };
    return DefaultKeyboardInput;
}());
export { DefaultKeyboardInput };
//# sourceMappingURL=keyboardInput.js.map