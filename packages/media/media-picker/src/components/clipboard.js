import * as tslib_1 from "tslib";
import { LocalUploadComponent } from './localUpload';
import { whenDomReady } from '../util/documentReady';
import { appendTimestamp } from '../util/appendTimestamp';
import { LocalFileSource } from '../service/types';
export var getFilesFromClipboard = function (files) {
    return Array.from(files).map(function (file) {
        if (file.type.indexOf('image/') === 0) {
            var name_1 = appendTimestamp(file.name, file.lastModified);
            return new File([file], name_1, {
                type: file.type,
            });
        }
        else {
            return file;
        }
    });
};
var ClipboardImpl = /** @class */ (function (_super) {
    tslib_1.__extends(ClipboardImpl, _super);
    function ClipboardImpl(context, config) {
        if (config === void 0) { config = { uploadParams: {} }; }
        var _this = _super.call(this, context, config) || this;
        _this.pasteHandler = function (event) {
            /*
              Browser behaviour for getting files from the clipboard is very inconsistent and buggy.
              @see https://extranet.atlassian.com/display/FIL/RFC+099%3A+Clipboard+browser+inconsistency
            */
            var clipboardData = event.clipboardData;
            if (clipboardData && clipboardData.files) {
                var fileSource_1 = clipboardData.types.length === 1
                    ? LocalFileSource.PastedScreenshot
                    : LocalFileSource.PastedFile;
                var filesArray = getFilesFromClipboard(clipboardData.files).map(function (file) { return ({ file: file, source: fileSource_1 }); });
                _this.uploadService.addFilesWithSource(filesArray);
            }
        };
        return _this;
    }
    ClipboardImpl.prototype.activate = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, whenDomReady];
                    case 1:
                        _a.sent();
                        this.deactivate();
                        document.addEventListener('paste', this.pasteHandler, false);
                        return [2 /*return*/];
                }
            });
        });
    };
    ClipboardImpl.prototype.deactivate = function () {
        document.removeEventListener('paste', this.pasteHandler);
    };
    return ClipboardImpl;
}(LocalUploadComponent));
export { ClipboardImpl };
//# sourceMappingURL=clipboard.js.map