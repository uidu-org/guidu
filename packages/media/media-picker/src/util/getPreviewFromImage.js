import * as tslib_1 from "tslib";
import { getImageInfo, getFileInfo } from '@uidu/media-ui';
export function getPreviewFromImage(file, devicePixelRatio) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileInfo, imageInfo, width, height, scaleFactor, preview;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getFileInfo(file)];
                case 1:
                    fileInfo = _a.sent();
                    return [4 /*yield*/, getImageInfo(fileInfo)];
                case 2:
                    imageInfo = _a.sent();
                    if (imageInfo === null) {
                        return [2 /*return*/, { file: file }];
                    }
                    else {
                        width = imageInfo.width, height = imageInfo.height, scaleFactor = imageInfo.scaleFactor;
                        preview = {
                            file: file,
                            dimensions: {
                                width: width,
                                height: height,
                            },
                            scaleFactor: devicePixelRatio || scaleFactor,
                        };
                        return [2 /*return*/, preview];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
export var SCALE_FACTOR_DEFAULT = 1;
//# sourceMappingURL=getPreviewFromImage.js.map