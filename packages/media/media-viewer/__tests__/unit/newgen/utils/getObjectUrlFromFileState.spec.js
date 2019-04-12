var _this = this;
import * as tslib_1 from "tslib";
import { getObjectUrlFromFileState } from '../../../../newgen/utils/getObjectUrlFromFileState';
describe('getObjectUrlFromFileState()', function () {
    it('should return an objectUrl if there is available preview in the state', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fileState, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fileState = {
                        status: 'processing',
                        name: '',
                        id: '',
                        mediaType: 'image',
                        mimeType: '',
                        size: 1,
                        preview: {
                            value: new Blob(),
                        },
                    };
                    _a = expect;
                    return [4 /*yield*/, getObjectUrlFromFileState(fileState)];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toEqual('mock result of URL.createObjectURL()');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return undefined if preview is not available', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var errorState, processedState, _a, _b;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    errorState = {
                        status: 'error',
                        id: '',
                    };
                    processedState = {
                        status: 'processed',
                        id: '',
                        artifacts: {},
                        mediaType: 'image',
                        mimeType: '',
                        name: '',
                        size: 1,
                    };
                    _a = expect;
                    return [4 /*yield*/, getObjectUrlFromFileState(errorState)];
                case 1:
                    _a.apply(void 0, [_c.sent()]).toBeUndefined();
                    _b = expect;
                    return [4 /*yield*/, getObjectUrlFromFileState(processedState)];
                case 2:
                    _b.apply(void 0, [_c.sent()]).toBeUndefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=getObjectUrlFromFileState.spec.js.map