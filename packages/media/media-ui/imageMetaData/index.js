import * as tslib_1 from "tslib";
import { SupportedImageMetaTag, ExifOrientation, } from './types';
import { readImageMetaTags } from './metatags';
import { loadImage } from '../util';
import { isRotated } from './imageOrientationUtil';
var Orientation = SupportedImageMetaTag.Orientation, XResolution = SupportedImageMetaTag.XResolution;
// http://bonfx.com/why-is-the-web-72-dpi-and-print-300-dpi/
var DPI_WEB_BASELINE = 72;
export { ExifOrientation, } from './types';
export function getImageInfo(fileInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var metadata, width, height, tags, scaleFactor;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readImageMetaData(fileInfo)];
                case 1:
                    metadata = _a.sent();
                    if (!metadata) {
                        return [2 /*return*/, null];
                    }
                    width = metadata.width, height = metadata.height, tags = metadata.tags;
                    scaleFactor = getScaleFactor(fileInfo.file, tags);
                    return [2 /*return*/, {
                            scaleFactor: scaleFactor,
                            width: width,
                            height: height,
                        }];
            }
        });
    });
}
export function getScaleFactor(file, tags) {
    var scaleFactorFromFilename = getScaleFactorFromFile(file);
    if (scaleFactorFromFilename !== null) {
        return scaleFactorFromFilename;
    }
    else if (tags) {
        /**
         * Scale Factor is actually a 2D thing, but in practice X & Y are same in 99% cases.
         * So we are only relying on X axis.
         */
        if (typeof tags['PixelPerUnitX'] === 'number') {
            // 1 inch = 0.0254 meters
            return (Math.round(tags['PixelPerUnitX'] * 0.0254) /
                DPI_WEB_BASELINE);
        }
        else {
            return (getMetaTagNumericValue(tags, XResolution, DPI_WEB_BASELINE) /
                DPI_WEB_BASELINE);
        }
    }
    else {
        return 1;
    }
}
var getOrientationFromTags = function (tags) {
    if (tags && tags[Orientation]) {
        var tagValue = tags[Orientation];
        if (tagValue) {
            var numericValue = parseInt(tagValue, 10);
            if (isNaN(numericValue)) {
                return ExifOrientation[tagValue];
            }
            return numericValue;
        }
    }
    return 1;
};
export function getOrientation(file) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tags;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readImageMetaTags(file)];
                case 1:
                    tags = _a.sent();
                    return [2 /*return*/, getOrientationFromTags(tags)];
            }
        });
    });
}
export function getMetaTagNumericValue(tags, key, defaultValue) {
    try {
        var num = parseFloat("" + tags[key]);
        if (!isNaN(num)) {
            return num;
        }
    }
    catch (e) {
        //
    }
    return defaultValue;
}
export function getScaleFactorFromFile(file) {
    try {
        // filenames with scale ratio in name take precedence - eg. filename@2x.png
        var match = file.name.trim().match(/@([0-9\.]+)x\.[a-z]{3}$/);
        if (match) {
            return parseFloat(match[1]);
        }
    }
    catch (e) {
        // parse problem, return null
    }
    return null;
}
export function readImageMetaData(fileInfo) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var file, src, type, width, height, tags, img, e_1, naturalWidth, naturalHeight, orientation, isImageRotated, data;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    file = fileInfo.file, src = fileInfo.src;
                    type = file.type;
                    width = 0;
                    height = 0;
                    return [4 /*yield*/, readImageMetaTags(file)];
                case 1:
                    tags = _a.sent();
                    // since we're reading metadata anyway, try to get dimensions from there...
                    if (tags && tags.PixelXDimension) {
                        width = getMetaTagNumericValue(tags, 'PixelXDimension', 0);
                    }
                    if (tags && tags.PixelXDimension) {
                        height = getMetaTagNumericValue(tags, 'PixelYDimension', 0);
                    }
                    if (!(width === 0 && height === 0)) return [3 /*break*/, 6];
                    img = void 0;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, loadImage(src)];
                case 3:
                    img = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    return [2 /*return*/, null];
                case 5:
                    naturalWidth = img.naturalWidth, naturalHeight = img.naturalHeight;
                    width = naturalWidth;
                    height = naturalHeight;
                    _a.label = 6;
                case 6:
                    orientation = getOrientationFromTags(tags);
                    isImageRotated = isRotated(orientation);
                    data = {
                        type: type,
                        width: isImageRotated ? height : width,
                        height: isImageRotated ? width : height,
                        tags: tags,
                    };
                    return [2 /*return*/, data];
            }
        });
    });
}
export * from './imageOrientationUtil';
//# sourceMappingURL=index.js.map