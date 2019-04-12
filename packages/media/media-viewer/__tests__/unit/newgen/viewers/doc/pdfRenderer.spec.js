var _this = this;
import * as tslib_1 from "tslib";
import * as React from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import * as PDFJSViewer from 'pdfjs-dist/web/pdf_viewer';
import Button from '@uidu/button';
import { PDFRenderer, pdfViewerClassName, } from '../../../../../newgen/viewers/doc/pdfRenderer';
import { ZoomControls } from '../../../../../newgen/zoomControls';
import { Spinner } from '../../../../../newgen/loading';
import { ErrorMessage } from '../../../../../newgen/error';
import { mountWithIntlContext } from '@uidu/media-test-helpers';
function createFixture(documentPromise) {
    var onClose = jest.fn();
    pdfjsLib.getDocument = jest.fn(function () { return ({
        promise: documentPromise,
    }); });
    PDFJSViewer.PDFViewer = jest.fn(function () {
        return {
            setDocument: jest.fn(),
            firstPagePromise: new Promise(function () { }),
        };
    });
    var el = mountWithIntlContext(React.createElement(PDFRenderer, { src: '', onClose: onClose }));
    return { el: el, onClose: onClose };
}
describe('PDFRenderer', function () {
    var originalGetDocument;
    var originalViewer;
    beforeEach(function () {
        originalGetDocument = pdfjsLib.getDocument;
        originalViewer = PDFJSViewer.PDFViewer;
    });
    afterEach(function () {
        pdfjsLib.getDocument = originalGetDocument;
        PDFJSViewer.PDFViewer = originalViewer;
    });
    it('supports zooming', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var documentPromise, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    documentPromise = Promise.resolve({});
                    el = createFixture(documentPromise).el;
                    return [4 /*yield*/, documentPromise];
                case 1:
                    _a.sent();
                    el.update();
                    expect(el.state('zoomLevel').value).toEqual(1);
                    expect(el.state('doc').status).toEqual('SUCCESSFUL');
                    expect(el.find(ZoomControls)).toHaveLength(1);
                    el.find(ZoomControls)
                        .find(Button)
                        .first()
                        .simulate('click');
                    expect(el.state('zoomLevel').value).toBeLessThan(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows a loading indicator until the document is ready', function () {
        var unresolvedDocumentPromise = new Promise(function () { });
        var el = createFixture(unresolvedDocumentPromise).el;
        expect(el.find(Spinner)).toHaveLength(1);
    });
    it('shows an error message when the document could not be loaded', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var failedDocumentPromise, el, errorMessage;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    failedDocumentPromise = Promise.reject(new Error('test'));
                    el = createFixture(failedDocumentPromise).el;
                    // wait for promise rejection ignoring the error
                    return [4 /*yield*/, failedDocumentPromise.catch(function () { })];
                case 1:
                    // wait for promise rejection ignoring the error
                    _a.sent();
                    el.update();
                    errorMessage = el.find(ErrorMessage);
                    expect(errorMessage).toHaveLength(1);
                    expect(errorMessage.text()).toContain("We couldn't generate a preview for this file");
                    expect(errorMessage.find(Button)).toHaveLength(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('MSW-700: clicking on background of DocViewer does not close it', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var documentPromise, _a, el, onClose;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    documentPromise = Promise.resolve({});
                    _a = createFixture(documentPromise), el = _a.el, onClose = _a.onClose;
                    return [4 /*yield*/, documentPromise];
                case 1:
                    _b.sent();
                    el.update();
                    el.find("." + pdfViewerClassName).simulate('click');
                    expect(onClose).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=pdfRenderer.spec.js.map