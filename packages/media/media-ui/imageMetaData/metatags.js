import * as tslib_1 from "tslib";
import { ImageType } from './types';
import { readJPEGExifMetaData } from './parseJPEG';
import { readPNGXMPMetaData } from './parsePNG';
import { parseXMPMetaData } from './parsePNGXMP';
export function readImageMetaTags(file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var type, _a, iTXt, pHYs, xmpMetaData, e_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    type = file.type;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    if (!(type === ImageType.PNG)) return [3 /*break*/, 3];
                    return [4 /*yield*/, readPNGXMPMetaData(file)];
                case 2:
                    _a = _b.sent(), iTXt = _a.iTXt, pHYs = _a.pHYs;
                    xmpMetaData = tslib_1.__assign({}, parseXMPMetaData(iTXt), pHYs);
                    return [2 /*return*/, xmpMetaData];
                case 3:
                    if (!(file.type === ImageType.JPEG)) return [3 /*break*/, 5];
                    return [4 /*yield*/, readJPEGExifMetaData(file)];
                case 4: return [2 /*return*/, _b.sent()];
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_1 = _b.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/, null];
            }
        });
    });
}
//# sourceMappingURL=metatags.js.map