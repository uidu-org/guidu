import { Paragraph } from './paragraph';
import { adjustSize } from '../../../util';
var defaultFontMetrics = {
    lineHeight: 0,
    descent: 0,
};
// Each text model stored in the core has a corresponding typeset.
// When a model is changed, the core calls 'update()'.
//
// Paragraphs are separated with the character '\n'. Currently each paragraph is one line.
//
// A typeset must provide text fragments and cursor positions.
//
// A fragment consists of:
//   - two alpha textures: one for the text per se and one for the stroke (outline); they should be bound when requested;
//   - position of the text fragment assuming that the text origin is in (0, 0).
//
// For the text containing N characters the typeset must produce N + 1 cursor positions. Each of them is a point with two values x and y.
// Line height and descent are used to render the cursor. Cursor positions for subsequent lines must have y coordinates that differ
// exactly in line height.
var Typeset = /** @class */ (function () {
    function Typeset(config) {
        this.config = config;
        this.isContextLost = false;
        this.fontMetrics = defaultFontMetrics;
        // We store paragraphs of text and update them when necessary.
        // Fragments are owned by paragraphs, paragraphs are responsible for their lifetime,
        // here we store fragments only to implement Core.TypesetInterop conveniently.
        this.paragraphs = [];
        this.fragments = [];
    }
    Typeset.prototype.unload = function () {
        // might be called multiple times
        this.destroy();
    };
    Typeset.prototype.contextLost = function () {
        this.isContextLost = true;
        this.destroy();
    };
    Typeset.prototype.contextRestored = function () {
        this.isContextLost = false;
    };
    // Updates the typeset with the new text. Passes the following arguments:
    //   text - the text to typeset
    //   textLength - the length of the text line (in UTF-32 code units)
    //   direction - text direction: 'ltr' or 'rtl'
    //   fontSize - font size in pixels
    //   cursorArray - array to be filled in with cursor data, the memory is pre-allocated in Emscripten heap
    //                 for  2 * (textLength + 1)  32-bit integers (x and y coordinates for cursor positions)
    //
    // Returns true if the update was successful
    // If the result is false, the core will not call the other functions from Core.TypesetInterop.
    Typeset.prototype.update = function (text, textLength, direction, fontSize, cursorArray) {
        if (this.isContextLost) {
            // sanity check because we manipulate textures during update
            return false;
        }
        this.fontMetrics = this.config.fontInfo.getFontMetrics(fontSize);
        return (this.updateParagraphs(text, direction, fontSize) &&
            this.collectParagraphData(cursorArray, textLength + 1));
    };
    // After update is completed successfully, the following functions are available:
    Typeset.prototype.getFragmentCount = function () {
        return this.fragments.length;
    };
    Typeset.prototype.bindNormal = function (fragmentIndex) {
        return this.bindFragmentTexture(fragmentIndex, function (fragment) {
            return fragment.bindNormal();
        });
    };
    Typeset.prototype.bindStroke = function (fragmentIndex) {
        return this.bindFragmentTexture(fragmentIndex, function (fragment) {
            return fragment.bindStroke();
        });
    };
    Typeset.prototype.getXBase = function (fragmentIndex) {
        return this.getFragmentCoordinate(fragmentIndex, function (pos) { return pos.xbase; });
    };
    Typeset.prototype.getYBase = function (fragmentIndex) {
        return this.getFragmentCoordinate(fragmentIndex, function (pos, yline) { return pos.ybase + yline; });
    };
    Typeset.prototype.getXOpposite = function (fragmentIndex) {
        return this.getFragmentCoordinate(fragmentIndex, function (pos) { return pos.xopposite; });
    };
    Typeset.prototype.getYOpposite = function (fragmentIndex) {
        return this.getFragmentCoordinate(fragmentIndex, function (pos, yline) { return pos.yopposite + yline; });
    };
    Typeset.prototype.getLineHeight = function () {
        return this.fontMetrics.lineHeight;
    };
    Typeset.prototype.getDescent = function () {
        return this.fontMetrics.descent;
    };
    Typeset.prototype.destroy = function () {
        var _this = this;
        // We should not release fragments explicitly because fragments are owned by paragraphs and released when we release paragraphs,
        // fragments are stored here only for convenience.
        this.fragments = [];
        this.paragraphs.forEach(function (par) { return par.unload(_this.isContextLost); });
        this.paragraphs = [];
    };
    Typeset.prototype.bindFragmentTexture = function (index, bindMethod) {
        return bindMethod(this.fragments[index].fragment);
    };
    Typeset.prototype.getFragmentCoordinate = function (index, getter) {
        var _a = this.fragments[index], fragment = _a.fragment, yline = _a.yline;
        return getter(fragment.position, yline);
    };
    Typeset.prototype.updateParagraphs = function (text, direction, fontSize) {
        var _this = this;
        // Paragraphs are separated by '\n'. Currently one paragraph contains one line
        var paragraphTexts = text.split('\n');
        // We don't recreate, we reuse paragraphs.
        // So we need the same number of paragraphs as the number of texts that we got in paragraphTexts array.
        adjustSize(this.paragraphs, paragraphTexts.length, function () {
            return new Paragraph(_this.config);
        }, function (paragraph) {
            // paragraphs contain textures and must be released explicitly
            paragraph.unload(_this.isContextLost);
        });
        // Update each paragraph. The lengths of this.paragraphs and paragraphTexts are the same
        return this.paragraphs.every(function (paragraph, index) {
            return paragraph.update(paragraphTexts[index], direction, fontSize);
        });
    };
    Typeset.prototype.collectParagraphData = function (cursorArray, cursorPosCount) {
        // Since every paragraph is successfully updated, we need to collect fragments and cursor positions
        return (this.collectFragments() &&
            this.collectCursorPositions(cursorArray, cursorPosCount));
    };
    Typeset.prototype.collectFragments = function () {
        var _this = this;
        // For fragments we will record each fragment and the y coordinate of the line
        // (currently one paragraph contains only one line).
        this.fragments = []; // we don't own fragments (paragraphs do), so we don't need to delete textures explicitly
        var lineHeight = this.fontMetrics.lineHeight;
        this.paragraphs.forEach(function (par, parIndex) {
            var yline = -parIndex * lineHeight;
            par.textFragments.forEach(function (fragment) {
                _this.fragments.push({ fragment: fragment, yline: yline });
            });
        });
        return true;
    };
    Typeset.prototype.collectCursorPositions = function (cursorArray, cursorPosCount) {
        // For cheaper interoperation the core preallocates the array in Emscripten memory heap.
        // 'cursorArray' is the offset in this 32-bit heap.
        // We must populate this array with the values from paragraphs.
        //
        // This array contains (cursorPosCount * 2) 32-bit numbers. For each cursor position it should store
        // firstly x and then y coordinate.
        // For example, if we have 3 cursor positions (12, -5), (16, -11), (22, -11) the core expects the array:
        // [12, -5, 16, -11, 22, -11]
        // which contains 6 elements
        var count = 2 * cursorPosCount; // number of elements in the array
        var heapBase = this.config.module.HEAP32.buffer;
        var array = new Int32Array(heapBase, cursorArray, count);
        var index = 0;
        var lineHeight = this.fontMetrics.lineHeight;
        this.paragraphs.forEach(function (par, parIndex) {
            var yline = Math.round(-parIndex * lineHeight);
            par.textCursorPositions.forEach(function (x) {
                if (index < count - 1) {
                    // We must check the limits for not to destroy heap data
                    array[index] = Math.round(x);
                    array[index + 1] = yline;
                }
                index += 2;
            });
        });
        return true;
    };
    return Typeset;
}());
export { Typeset };
//# sourceMappingURL=typeset.js.map