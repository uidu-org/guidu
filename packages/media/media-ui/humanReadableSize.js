import * as bytes from 'bytes';
// tslint:disable-next-line:no-bitwise
var ONE_MEGABYTE_IN_BYTES = 1 << 20;
/**
 * Takes a media (file) size in bytes and returns a human readable string
 */
export function toHumanReadableMediaSize(size) {
    // [MS-967]: Api issue might return string for size
    var parsedSize = parseInt("" + size, 10);
    var decimalPlaces = parsedSize < ONE_MEGABYTE_IN_BYTES ? 0 : 1;
    return bytes
        .format(parsedSize, {
        unitSeparator: ' ',
        decimalPlaces: decimalPlaces,
    })
        .toUpperCase();
}
//# sourceMappingURL=humanReadableSize.js.map