var _this = this;
import * as tslib_1 from "tslib";
import VideoSnapshot from 'video-snapshot';
export var getPreviewFromBlob = function (file, mediaType) {
    return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var src, img_1, snapshoter, dimensions, preview;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    src = URL.createObjectURL(file);
                    if (!(mediaType === 'image')) return [3 /*break*/, 1];
                    img_1 = new Image();
                    img_1.src = src;
                    img_1.onload = function () {
                        var dimensions = { width: img_1.width, height: img_1.height };
                        var preview = {
                            file: file,
                            dimensions: dimensions,
                            scaleFactor: 1,
                        };
                        URL.revokeObjectURL(src);
                        resolve(preview);
                    };
                    img_1.onerror = reject;
                    return [3 /*break*/, 4];
                case 1:
                    if (!(mediaType === 'video')) return [3 /*break*/, 3];
                    snapshoter = new VideoSnapshot(file);
                    return [4 /*yield*/, snapshoter.getDimensions()];
                case 2:
                    dimensions = _a.sent();
                    preview = {
                        file: file,
                        dimensions: dimensions,
                        scaleFactor: 1,
                    };
                    snapshoter.end();
                    resolve(preview);
                    return [3 /*break*/, 4];
                case 3:
                    resolve({ file: file });
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
//# sourceMappingURL=getPreviewFromBlob.js.map