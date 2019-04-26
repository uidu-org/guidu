export var colorSame = function (a, b) {
    return a.red === b.red && a.green === b.green && a.blue === b.blue;
};
export var colorWithAlphaSame = function (a, b) {
    return (a.red === b.red &&
        a.green === b.green &&
        a.blue === b.blue &&
        a.alpha === b.alpha);
};
export var dimensionsSame = function (a, b) {
    return a.width === b.width && a.height === b.height;
};
// The editor core consumes and operates with UTF-32 strings.
// JavaScript uses UTF-16 encoding for string.
// The following two functions are necessary to get UTF-32 code units (numeric codes or as strings) from a JS string.
//
// In UTF-16 a code unit is two bytes.
// When we call String.charCodeAt() we get a UTF-16 code unit. String.length returns the number of UTF-16 code units.
//
// Most of the characters we use are encoded with one UTF-16 code unit and we translate it to UTF-32 easily: the code is the same.
// For example the letter 'a' is represented with the code 0x0061. The corresponding UTF-32 code is 0x00000061.
//
// Unfortunately there are characters that are represented with two UTF-16 code units.
// Their Unicode values are in the range 0x10000-0x10FFFF.
// In UTF-16 they are represented as surrogate pairs:
//   the first UTF-16 code unit is in range 0xD800-0xDBFF and is called a high surrogate;
//   the second UTF-16 code unit is in range 0xDC00-0xDFFF and is called a low surrogate.
//
// No character can be encoded with one UTF-16 code unit in the range 0xD800-0xDBFF. If we get such a code unit
// then it's always a high surrogate and to get the whole character we need the next UTF-16 code unit which is the low surrogate.
//
// To form a surrogate pair (according to UTF-16 encoding) we need:
// 1) Subtract 0x010000 from the Unicode code. The result will be in range 0-0xFFFFF, i.e. will contain 20 bits.
// 2) Get the top ten bits, add 0xD800. The result will be the high surrogate pair.
// 3) Get the low ten bits, add 0xDC00. The result will be the low surrogate pair.
//
// To get back (to get the UTF-32 code) we revert the operations:
// 1) top_ten_bits = high_surrogate - 0xD800
// 2) low_ten_bits = low_surrogate - 0xDC00
// 3) To shift ten bits left we multiply by 0x400, thus the result is
//
//    result = top_ten_bits * 0x400 + low_ten_bits + 0x10000 =
//           = (high_surrogate - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000
//
// More info:
// https://mathiasbynens.be/notes/javascript-encoding
// https://en.wikipedia.org/wiki/UTF-16
// Gets UTF-32 codes of a given string
export var getUtf32Codes = function (text) {
    return splitText(text, function (code) { return code; }, function (high, low) { return (high - 0xd800) * 0x400 + (low - 0xdc00) + 0x10000; });
};
// Splits a string to strings each of them is one Unicode character.
// We can't just split to UTF-16 code units because of surrogate pairs. For example,
// '\uD834\uDF06' is one Unicode character and should be represented as '\uD834\uDF06' or '\u{1D306}',
// but not ['\uD834', '\uDF06'].
export var getUtf32CodeUnits = function (text) {
    return splitText(text, function (code) { return String.fromCharCode(code); }, function (high, low) { return String.fromCharCode(high, low); });
};
function splitText(text, charCodeHandler, surrogatePairHandler) {
    var result = [];
    for (var i = 0; i < text.length; ++i) {
        var current = text.charCodeAt(i);
        if (current >= 0xd800 && current <= 0xdbff && i < text.length - 1) {
            // high surrogate
            var next = text.charCodeAt(i + 1);
            ++i;
            if (next >= 0xdc00 && next <= 0xdfff) {
                // low surrogate
                result.push(surrogatePairHandler(current, next));
            }
            else {
                // the string is broken
                result.push(charCodeHandler(current), charCodeHandler(next));
            }
        }
        else {
            result.push(charCodeHandler(current));
        }
    }
    return result;
}
// The function adjusts the size of the 'elements' to the requiredSize.
// It can create some elements, or delete some. It uses the fuctions creator, deleter for this.
export function adjustSize(elements, requiredSize, creator, deleter) {
    var currentSize = elements.length;
    if (currentSize > requiredSize) {
        // We need to delete some elements
        var deleteStartIndex = requiredSize;
        elements.splice(deleteStartIndex).forEach(deleter);
    }
    else if (currentSize < requiredSize) {
        // We need to add some elements
        var numToAdd = requiredSize - currentSize;
        for (var i = 0; i < numToAdd; ++i) {
            elements.push(creator());
        }
    }
}
export var fileToBase64 = function (blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        // TODO: [ts30] Add proper handling for null and ArrayBuffer
        reader.onloadend = function () { return resolve(reader.result); };
        reader.onabort = function () { return reject('abort'); };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
//# sourceMappingURL=util.js.map