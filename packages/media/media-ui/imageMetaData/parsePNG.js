import * as tslib_1 from "tslib";
import { fileToArrayBuffer } from '../util';
var pngChunksExtract;
export function readPNGXMPMetaData(file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var module_1, buffer, chunks;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!pngChunksExtract) return [3 /*break*/, 2];
                    return [4 /*yield*/, import('png-chunks-extract')];
                case 1:
                    module_1 = _a.sent();
                    pngChunksExtract = module_1.default || module_1;
                    _a.label = 2;
                case 2: return [4 /*yield*/, fileToArrayBuffer(file)];
                case 3:
                    buffer = _a.sent();
                    chunks = pngChunksExtract(buffer);
                    return [4 /*yield*/, parsePNGChunks(chunks)];
                case 4: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
export function parsePNGChunks(chunks) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var iTXt, pHYs, i, chunk, dv, unitSpecifier, PixelPerUnitX, PixelPerUnitY;
        return tslib_1.__generator(this, function (_a) {
            iTXt = '';
            pHYs = {};
            /**
             * http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html#C.Summary-of-standard-chunks
             * Order of every chunk is not guaranteed.
             * And both iTXt and pHYs are Ancillary chunks.
             */
            for (i = 0; i < chunks.length; ++i) {
                chunk = chunks[i];
                // Must be last
                if (chunk.name === 'IEND') {
                    break;
                }
                /**
                 * http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html#C.Anc-text
                 * iTXt contains the useful XMP/XML string data of meta tags
                 */
                if (chunk.name === 'iTXt') {
                    iTXt = String.fromCharCode.apply(null, chunk.data);
                }
                /**
                 * http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html#C.pHYs
                 * Pixels per unit, X axis: 4 bytes (unsigned integer)
                 * Pixels per unit, Y axis: 4 bytes (unsigned integer)
                 * Unit specifier:          1 byte  (0: unit is unknown 1: unit is the meter)
                 */
                if (chunk.name === 'pHYs') {
                    dv = new DataView(chunk.data.buffer);
                    unitSpecifier = dv.getUint8(8);
                    // meter
                    if (unitSpecifier === 1) {
                        PixelPerUnitX = dv.getUint32(0);
                        PixelPerUnitY = dv.getUint32(4);
                        pHYs = { PixelPerUnitX: PixelPerUnitX, PixelPerUnitY: PixelPerUnitY };
                    }
                }
            }
            return [2 /*return*/, { iTXt: iTXt, pHYs: pHYs }];
        });
    });
}
//# sourceMappingURL=parsePNG.js.map