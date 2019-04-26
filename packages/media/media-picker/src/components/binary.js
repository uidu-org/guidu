import * as tslib_1 from "tslib";
import { LocalUploadComponent } from './localUpload';
var BinaryUploaderImpl = /** @class */ (function (_super) {
    tslib_1.__extends(BinaryUploaderImpl, _super);
    function BinaryUploaderImpl(context, config) {
        return _super.call(this, context, config) || this;
    }
    BinaryUploaderImpl.prototype.upload = function (base64, name) {
        var filename = name || 'file';
        var file = this._urltoFile(base64, filename);
        this.uploadService.addFiles([file]);
    };
    BinaryUploaderImpl.prototype._urltoFile = function (dataurl, filename) {
        var arr = dataurl.split(',');
        var matches = arr[0].match(/:(.*?);/);
        if (!matches || matches.length < 2) {
            throw new Error('Failed to retrieve file from data URL');
        }
        var mime = matches[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new Blob([u8arr], { type: mime });
        file.name = filename;
        return file;
    };
    return BinaryUploaderImpl;
}(LocalUploadComponent));
export { BinaryUploaderImpl };
//# sourceMappingURL=binary.js.map