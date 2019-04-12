var _this = this;
import * as tslib_1 from "tslib";
import VideoSnapshot from 'video-snapshot';
import { getMediaTypeFromMimeType } from '@uidu/media-core';
import { getOrientation } from '@uidu/media-ui';
export var getDataURIFromFileState = function (state) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var value, type, mediaType, orientation_1, src, snapshoter, src;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (state.status === 'error' ||
                    state.status === 'failed-processing' ||
                    !state.preview) {
                    return [2 /*return*/, {}];
                }
                return [4 /*yield*/, state.preview];
            case 1:
                value = (_a.sent()).value;
                if (!(value instanceof Blob)) return [3 /*break*/, 6];
                type = value.type;
                mediaType = getMediaTypeFromMimeType(type);
                if (!(mediaType === 'image')) return [3 /*break*/, 3];
                return [4 /*yield*/, getOrientation(value)];
            case 2:
                orientation_1 = _a.sent();
                src = URL.createObjectURL(value);
                return [2 /*return*/, {
                        src: src,
                        orientation: orientation_1,
                    }];
            case 3:
                if (!(mediaType === 'video')) return [3 /*break*/, 5];
                snapshoter = new VideoSnapshot(value);
                return [4 /*yield*/, snapshoter.takeSnapshot()];
            case 4:
                src = _a.sent();
                snapshoter.end();
                return [2 /*return*/, {
                        src: src,
                    }];
            case 5: return [3 /*break*/, 7];
            case 6: return [2 /*return*/, {
                    src: value,
                    orientation: 1,
                }];
            case 7: return [2 /*return*/, {}];
        }
    });
}); };
//# sourceMappingURL=getDataURIFromFileState.js.map