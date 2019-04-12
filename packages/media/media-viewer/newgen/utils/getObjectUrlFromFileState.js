var _this = this;
import * as tslib_1 from "tslib";
export var getObjectUrlFromFileState = function (state) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var preview, _a, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(state.status !== 'error')) return [3 /*break*/, 2];
                preview = state.preview;
                if (!preview) return [3 /*break*/, 2];
                _b = (_a = URL).createObjectURL;
                return [4 /*yield*/, preview];
            case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).value])];
            case 2: return [2 /*return*/, undefined];
        }
    });
}); };
//# sourceMappingURL=getObjectUrlFromFileState.js.map