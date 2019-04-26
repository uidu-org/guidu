var _this = this;
import * as tslib_1 from "tslib";
import * as path from 'path';
import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { gotoPopupSimplePage } from '../../../pages/popup-simple-page';
BrowserTestCase('local-upload.ts: MediaPicker - local upload', { skip: ['edge', 'ie', 'safari', 'firefox'] }, function (client) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var page, filename, localPath, _a, _b, _c, _d, _e;
    return tslib_1.__generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, gotoPopupSimplePage(client)];
            case 1:
                page = _f.sent();
                filename = 'popup.png';
                localPath = path.join(__dirname, '..', '..', '..', 'docs', filename);
                _a = expect;
                return [4 /*yield*/, page.getRecentUploadCards()];
            case 2:
                _a.apply(void 0, [_f.sent()]).toHaveLength(10);
                return [4 /*yield*/, page.uploadFile(localPath)];
            case 3:
                _f.sent();
                _b = expect;
                return [4 /*yield*/, page.getRecentUploadCards()];
            case 4:
                _b.apply(void 0, [_f.sent()]).toHaveLength(11);
                _c = expect;
                return [4 /*yield*/, page.getRecentUploadCard(filename)];
            case 5:
                _c.apply(void 0, [_f.sent()]).not.toBeUndefined();
                return [4 /*yield*/, page.clickInsertButton()];
            case 6:
                _f.sent();
                _d = expect;
                return [4 /*yield*/, page.getEvent('uploads-start')];
            case 7:
                _d.apply(void 0, [_f.sent()]).toMatchObject({
                    payload: { files: [{ name: filename }] },
                });
                _e = expect;
                return [4 /*yield*/, page.getEvent('upload-end')];
            case 8:
                _e.apply(void 0, [_f.sent()]).toMatchObject({
                    payload: { file: { name: filename } },
                });
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=local-upload.js.map