import * as tslib_1 from "tslib";
import * as React from 'react';
import { Outcome } from '../../domain';
import { createError } from '../../error';
import { Spinner } from '../../loading';
import { constructAuthTokenUrl } from '../../utils';
import { getArtifactUrl } from '@uidu/media-store';
import { BaseViewer } from '../base-viewer';
import { getObjectUrlFromFileState } from '../../utils/getObjectUrlFromFileState';
var moduleLoader = function () {
    return import(/* webpackChunkName:"@atlaskit-internal_media-viewer-pdf-viewer" */ './pdfRenderer');
};
var componentLoader = function () {
    return moduleLoader().then(function (module) { return module.PDFRenderer; });
};
var DocViewer = /** @class */ (function (_super) {
    tslib_1.__extends(DocViewer, _super);
    function DocViewer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DocViewer.prototype, "initialState", {
        get: function () {
            return {
                content: Outcome.pending(),
            };
        },
        enumerable: true,
        configurable: true
    });
    DocViewer.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, item, context, collectionName, pdfArtifactUrl, src, err_1, src;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!DocViewer.PDFComponent) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadDocViewer()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _a = this.props, item = _a.item, context = _a.context, collectionName = _a.collectionName;
                        if (!(item.status === 'processed')) return [3 /*break*/, 7];
                        pdfArtifactUrl = getArtifactUrl(item.artifacts, 'document.pdf');
                        if (!pdfArtifactUrl) {
                            this.setState({
                                content: Outcome.failed(createError('noPDFArtifactsFound', undefined, item)),
                            });
                            return [2 /*return*/];
                        }
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, constructAuthTokenUrl(pdfArtifactUrl, context, collectionName)];
                    case 4:
                        src = _b.sent();
                        this.setState({
                            content: Outcome.successful(src),
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _b.sent();
                        this.setState({
                            content: Outcome.failed(createError('previewFailed', err_1, item)),
                        });
                        return [3 /*break*/, 6];
                    case 6: return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, getObjectUrlFromFileState(item)];
                    case 8:
                        src = _b.sent();
                        if (!src) {
                            this.setState({
                                content: Outcome.pending(),
                            });
                            return [2 /*return*/];
                        }
                        this.setState({
                            content: Outcome.successful(src),
                        });
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    DocViewer.prototype.loadDocViewer = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = DocViewer;
                        return [4 /*yield*/, componentLoader()];
                    case 1:
                        _a.PDFComponent = _b.sent();
                        this.forceUpdate();
                        return [2 /*return*/];
                }
            });
        });
    };
    DocViewer.prototype.release = function () {
        var content = this.state.content;
        if (!content.data) {
            return;
        }
        URL.revokeObjectURL(content.data);
    };
    DocViewer.prototype.renderSuccessful = function (content) {
        var onClose = this.props.onClose;
        var PDFComponent = DocViewer.PDFComponent;
        if (!PDFComponent) {
            return React.createElement(Spinner, null);
        }
        return React.createElement(PDFComponent, { src: content, onClose: onClose });
    };
    return DocViewer;
}(BaseViewer));
export { DocViewer };
//# sourceMappingURL=index.js.map