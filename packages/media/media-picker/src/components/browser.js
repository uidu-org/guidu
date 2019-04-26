import * as tslib_1 from "tslib";
import { LocalUploadComponent } from './localUpload';
import * as exenv from 'exenv';
var BrowserImpl = /** @class */ (function (_super) {
    tslib_1.__extends(BrowserImpl, _super);
    function BrowserImpl(context, browserConfig) {
        if (browserConfig === void 0) { browserConfig = { uploadParams: {} }; }
        var _this = _super.call(this, context, browserConfig) || this;
        _this.onFilePicked = function () {
            var filesArray = [].slice.call(_this.browseElement.files);
            _this.uploadService.addFiles(filesArray);
        };
        if (!exenv.canUseDOM) {
            _this.browseElement = {};
            return _this;
        }
        _this.browseElement = document.createElement('input');
        _this.browseElement.setAttribute('type', 'file');
        _this.browseElement.style.display = 'none';
        if (browserConfig.multiple) {
            _this.browseElement.setAttribute('multiple', '');
        }
        if (browserConfig.fileExtensions) {
            _this.browseElement.setAttribute('accept', browserConfig.fileExtensions.join(','));
        }
        // IE11 hack - click will not execute if input has no parent
        // WebDriver hack - click will not execute if input isn't in the document
        document.body.appendChild(_this.browseElement);
        _this.addEvents();
        return _this;
    }
    BrowserImpl.prototype.addEvents = function () {
        this.browseElement.addEventListener('change', this.onFilePicked);
    };
    BrowserImpl.prototype.removeEvents = function () {
        this.browseElement.removeEventListener('change', this.onFilePicked);
    };
    BrowserImpl.prototype.browse = function () {
        this.browseElement.click();
    };
    BrowserImpl.prototype.teardown = function () {
        this.removeEvents();
        var parentNode = this.browseElement.parentNode;
        if (parentNode) {
            parentNode.removeChild(this.browseElement);
        }
    };
    return BrowserImpl;
}(LocalUploadComponent));
export { BrowserImpl };
//# sourceMappingURL=browser.js.map