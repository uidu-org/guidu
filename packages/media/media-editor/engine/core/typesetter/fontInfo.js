// Provides font info for different font sizes. Caches the values calculated for different font sizes
// Font size is in pixels.
var FontInfo = /** @class */ (function () {
    function FontInfo(textHelperDiv) {
        this.textHelperDiv = textHelperDiv;
        this.cache = {};
    }
    FontInfo.prototype.getFontMetrics = function (fontSize) {
        var storedValue = this.cache[fontSize];
        if (storedValue) {
            return storedValue;
        }
        else {
            // There is no metrics in the cache. We calculate it and place to the cache.
            var metrics = this.calculateFontMetrics(fontSize);
            this.cache[fontSize] = metrics;
            return metrics;
        }
    };
    // CSS style for the font that we use to render text
    FontInfo.getFontStyle = function (fontSize) {
        return "bold " + fontSize + "px Helvetica, Arial, Sans-Serif";
    };
    FontInfo.prototype.calculateFontMetrics = function (fontSize) {
        // We'll create a temporary span and read its height
        var span = document.createElement('span');
        span.style.font = FontInfo.getFontStyle(fontSize);
        span.innerText = 'Aq'; // the actual text doesn't matter, it should be non-empty
        this.textHelperDiv.appendChild(span);
        var rect = span.getBoundingClientRect();
        this.textHelperDiv.removeChild(span);
        // As there is no API to get font metrics we measure the span height and make calculations.
        // The coefficients were adjusted manually to get a nice looking result.
        var lineHeightCoefficient = 1.1;
        var descentCoefficient = 0.15;
        var lineHeight = Math.round(lineHeightCoefficient * ((rect && rect.height) || fontSize));
        var descent = Math.round(descentCoefficient * lineHeight);
        return { lineHeight: lineHeight, descent: descent };
    };
    return FontInfo;
}());
export { FontInfo };
//# sourceMappingURL=fontInfo.js.map