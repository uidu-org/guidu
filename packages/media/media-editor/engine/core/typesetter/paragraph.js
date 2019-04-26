import * as tslib_1 from "tslib";
import { FontInfo } from './fontInfo';
import { renderText } from './textRenderer';
import { getCursorPositions } from './cursorPositions';
// Holds fragments and cursor positions for one paragraph.
// Each fragment has two textures and the position. The paragraph is responsible for releasing the fragment textures.
// The position of the fragment is in the coordinates where the paragraph starts at (0, 0).
// Currently a paragraph can contain only one line, thus we store only x positions of the cursors.
var Paragraph = /** @class */ (function () {
    // if a text contains N UTF-32 code units, we should have N + 1 cursor positions
    function Paragraph(config) {
        this.config = config;
        this.text = '';
        this.direction = 'ltr';
        this.fontSize = 0;
        this.isValid = false; // indicates whether fragments or cursor positions were created for the last update
        this.fragments = []; // text fragments
        this.cursorPositions = []; // x coordinates of the cursor positions
    }
    Paragraph.prototype.unload = function (isContextLost) {
        this.destroy(isContextLost);
    };
    Object.defineProperty(Paragraph.prototype, "textFragments", {
        get: function () {
            return this.fragments;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paragraph.prototype, "textCursorPositions", {
        get: function () {
            return this.cursorPositions;
        },
        enumerable: true,
        configurable: true
    });
    Paragraph.prototype.update = function (text, direction, fontSize) {
        if (text === this.text &&
            direction === this.direction &&
            fontSize === this.fontSize &&
            this.isValid) {
            // The paragraph is up to date.
            // No need to recreate fragments or calculate cursor positions.
            return true;
        }
        this.text = text;
        this.direction = direction;
        this.fontSize = fontSize;
        this.destroy(false); // 'false' because we receive update() only when the context is valid
        this.cursorPositions = [];
        this.isValid = this.createFragments() && this.calculateCursorPositions();
        return this.isValid;
    };
    Paragraph.prototype.destroy = function (isContextLost) {
        this.fragments.forEach(function (fragment) { return fragment.unload(isContextLost); });
    };
    Paragraph.prototype.createFragments = function () {
        this.fragments = [];
        var _a = this, text = _a.text, direction = _a.direction, fontSize = _a.fontSize;
        return renderText(this.fragments, tslib_1.__assign({ text: text,
            direction: direction,
            fontSize: fontSize }, this.config));
    };
    Paragraph.prototype.calculateCursorPositions = function () {
        var _a = this, text = _a.text, direction = _a.direction, fontSize = _a.fontSize;
        var textHelperDiv = this.config.textHelperDiv;
        // We create a helper div, set its font and direction to the required and call getCursorPositions()
        var rootDiv = document.createElement('div');
        textHelperDiv.appendChild(rootDiv);
        rootDiv.style.font = FontInfo.getFontStyle(fontSize);
        rootDiv.style.direction = direction;
        this.cursorPositions = getCursorPositions(text, direction, rootDiv);
        textHelperDiv.removeChild(rootDiv);
        return true;
    };
    return Paragraph;
}());
export { Paragraph };
//# sourceMappingURL=paragraph.js.map