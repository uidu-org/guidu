import * as tslib_1 from "tslib";
import { SupportedImageMetaTag } from './types';
var XResolution = SupportedImageMetaTag.XResolution, YResolution = SupportedImageMetaTag.YResolution;
var loadImage;
export function readJPEGExifMetaData(file) {
    var _this = this;
    return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var module_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!loadImage) return [3 /*break*/, 2];
                    return [4 /*yield*/, import('blueimp-load-image')];
                case 1:
                    module_1 = _a.sent();
                    loadImage = module_1.default || module_1;
                    _a.label = 2;
                case 2:
                    loadImage.parseMetaData(file, function (data) {
                        try {
                            var tags_1 = data && data.exif ? data.exif.getAll() : {};
                            Object.keys(tags_1).forEach(function (key) {
                                var value = tags_1[key];
                                if (typeof value === 'object' &&
                                    (key === XResolution || key === YResolution) &&
                                    'numerator' in value) {
                                    // some test images had this structure, so just take the numerator value to simplify returned value
                                    tags_1[key] = value.numerator;
                                }
                                if (typeof tags_1[key] === 'number') {
                                    // in case numbers types were auto-converted, keep everything the same between jpeg & png we keep as strings
                                    tags_1[key] = "" + tags_1[key];
                                }
                            });
                            resolve(tags_1);
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    return [2 /*return*/];
            }
        });
    }); });
}
//# sourceMappingURL=parseJPEG.js.map