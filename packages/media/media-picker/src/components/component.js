import * as tslib_1 from "tslib";
import { GenericEventEmitter } from '../util/eventEmitter';
var UploadComponent = /** @class */ (function (_super) {
    tslib_1.__extends(UploadComponent, _super);
    function UploadComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UploadComponent.prototype.emitUploadsStart = function (files) {
        this.emit('uploads-start', {
            files: files,
        });
    };
    UploadComponent.prototype.emitUploadProgress = function (file, progress) {
        this.emit('upload-status-update', {
            file: file,
            progress: progress,
        });
    };
    UploadComponent.prototype.emitUploadPreviewUpdate = function (file, preview) {
        this.emit('upload-preview-update', {
            file: file,
            preview: preview,
        });
    };
    UploadComponent.prototype.emitUploadProcessing = function (file) {
        this.emit('upload-processing', { file: file });
    };
    UploadComponent.prototype.emitUploadEnd = function (file, fileDetails) {
        this.emit('upload-end', { file: file, public: fileDetails });
    };
    UploadComponent.prototype.emitUploadError = function (file, error) {
        this.emit('upload-error', {
            file: file,
            error: error,
        });
    };
    return UploadComponent;
}(GenericEventEmitter));
export { UploadComponent };
//# sourceMappingURL=component.js.map