import * as tslib_1 from "tslib";
import * as React from 'react';
import { getOrientation } from '@uidu/media-ui';
import { Outcome } from '../../domain';
import { createError } from '../../error';
import { InteractiveImg } from './interactive-img';
import { BaseViewer } from '../base-viewer';
export var REQUEST_CANCELLED = 'request_cancelled';
function processedFileStateToMediaItem(file) {
    return {
        type: 'file',
        details: {
            id: file.id,
        },
    };
}
var ImageViewer = /** @class */ (function (_super) {
    tslib_1.__extends(ImageViewer, _super);
    function ImageViewer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onLoad = function () {
            _this.props.onLoad({ status: 'success' });
        };
        _this.onError = function () {
            _this.props.onLoad({
                status: 'error',
                errorMessage: 'Interactive-img render failed',
            });
        };
        return _this;
    }
    Object.defineProperty(ImageViewer.prototype, "initialState", {
        get: function () {
            return { content: Outcome.pending() };
        },
        enumerable: true,
        configurable: true
    });
    // This method is spied on by some test cases, so don't rename or remove it.
    ImageViewer.prototype.preventRaceCondition = function () {
        // Calling setState might introduce a race condition, because the app has
        // already transitioned to a different state. To avoid this we're not doing
        // anything.
    };
    ImageViewer.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, file, context, collectionName, orientation_1, objectUrl, item, controller_1, response, _b, _c, preview, value, err_1;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.props, file = _a.item, context = _a.context, collectionName = _a.collectionName;
                        if (file.status === 'error') {
                            return [2 /*return*/];
                        }
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 10, , 11]);
                        orientation_1 = 1;
                        objectUrl = void 0;
                        if (!(file.status === 'processed')) return [3 /*break*/, 3];
                        item = processedFileStateToMediaItem(file);
                        controller_1 = typeof AbortController !== 'undefined'
                            ? new AbortController()
                            : undefined;
                        response = context.getImage(item.details.id, {
                            width: 1920,
                            height: 1080,
                            mode: 'fit',
                            allowAnimated: true,
                            collection: collectionName,
                        }, controller_1);
                        this.cancelImageFetch = function () { return controller_1 && controller_1.abort(); };
                        _c = (_b = URL).createObjectURL;
                        return [4 /*yield*/, response];
                    case 2:
                        objectUrl = _c.apply(_b, [_d.sent()]);
                        return [3 /*break*/, 9];
                    case 3:
                        preview = file.preview;
                        if (!preview) return [3 /*break*/, 8];
                        return [4 /*yield*/, preview];
                    case 4:
                        value = (_d.sent()).value;
                        if (!(value instanceof Blob)) return [3 /*break*/, 6];
                        return [4 /*yield*/, getOrientation(value)];
                    case 5:
                        orientation_1 = _d.sent();
                        objectUrl = URL.createObjectURL(value);
                        return [3 /*break*/, 7];
                    case 6:
                        objectUrl = value;
                        _d.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        this.setState({
                            content: Outcome.pending(),
                        });
                        return [2 /*return*/];
                    case 9:
                        this.setState({
                            content: Outcome.successful({ objectUrl: objectUrl, orientation: orientation_1 }),
                        });
                        return [3 /*break*/, 11];
                    case 10:
                        err_1 = _d.sent();
                        if (err_1.message === REQUEST_CANCELLED) {
                            this.preventRaceCondition();
                        }
                        else {
                            this.setState({
                                content: Outcome.failed(createError('previewFailed', err_1, file)),
                            });
                            this.props.onLoad({ status: 'error', errorMessage: err_1.message });
                        }
                        return [3 /*break*/, 11];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ImageViewer.prototype.release = function () {
        var _this = this;
        if (this.cancelImageFetch) {
            this.cancelImageFetch();
        }
        this.state.content.whenSuccessful(function (_a) {
            var objectUrl = _a.objectUrl;
            _this.revokeObjectUrl(objectUrl);
        });
    };
    // This method is spied on by some test cases, so don't rename or remove it.
    ImageViewer.prototype.revokeObjectUrl = function (objectUrl) {
        URL.revokeObjectURL(objectUrl);
    };
    ImageViewer.prototype.renderSuccessful = function (content) {
        var onClose = this.props.onClose;
        return (React.createElement(InteractiveImg, { onLoad: this.onLoad, onError: this.onError, src: content.objectUrl, orientation: content.orientation, onClose: onClose }));
    };
    return ImageViewer;
}(BaseViewer));
export { ImageViewer };
//# sourceMappingURL=index.js.map