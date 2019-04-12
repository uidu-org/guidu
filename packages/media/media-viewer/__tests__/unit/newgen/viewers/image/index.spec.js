var _this = this;
import * as tslib_1 from "tslib";
import * as React from 'react';
import { awaitError, mountWithIntlContext, fakeContext, } from '@uidu/media-test-helpers';
import { ImageViewer, REQUEST_CANCELLED, } from '../../../../../newgen/viewers/image';
var collectionName = 'some-collection';
var imageItem = {
    id: 'some-id',
    status: 'processed',
    name: 'my image',
    size: 11222,
    mediaType: 'image',
    mimeType: 'jpeg',
    artifacts: {},
};
function createFixture(response) {
    var context = fakeContext();
    context.getImage.mockReturnValue(response);
    var onClose = jest.fn();
    var onLoaded = jest.fn();
    var el = mountWithIntlContext(React.createElement(ImageViewer, { context: context, item: imageItem, collectionName: collectionName, onClose: onClose, onLoad: onLoaded }));
    return { context: context, el: el, onClose: onClose };
}
describe('ImageViewer', function () {
    it('assigns an object url for images when successful', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = Promise.resolve(new Blob());
                    el = createFixture(response).el;
                    return [4 /*yield*/, response];
                case 1:
                    _a.sent();
                    expect(el.state().content.data).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not update state when image fetch request is cancelled', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = Promise.reject(new Error(REQUEST_CANCELLED));
                    el = createFixture(response).el;
                    el.instance()['preventRaceCondition'] = jest.fn();
                    return [4 /*yield*/, awaitError(response, REQUEST_CANCELLED)];
                case 1:
                    _a.sent();
                    expect(el.instance()['preventRaceCondition'].mock.calls.length === 1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('cancels an image fetch request when unmounted', function () {
        var abort = jest.fn();
        var FakeAbortController = /** @class */ (function () {
            function FakeAbortController() {
                this.abort = abort;
            }
            return FakeAbortController;
        }());
        global.AbortController = FakeAbortController;
        var response = new Promise(function () { });
        var el = createFixture(response).el;
        el.unmount();
        expect(abort).toHaveBeenCalled();
    });
    it('revokes an existing object url when unmounted', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, el, revokeObjectUrl;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = Promise.resolve(new Blob());
                    el = createFixture(response).el;
                    revokeObjectUrl = jest.fn();
                    el.instance()['revokeObjectUrl'] = revokeObjectUrl;
                    return [4 /*yield*/, response];
                case 1:
                    _a.sent();
                    el.unmount();
                    expect(revokeObjectUrl).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should pass collectionName to context.getImage', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, _a, el, context;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    response = Promise.resolve(new Blob());
                    _a = createFixture(response), el = _a.el, context = _a.context;
                    return [4 /*yield*/, response];
                case 1:
                    _b.sent();
                    el.update();
                    expect(context.getImage).toHaveBeenCalledWith('some-id', expect.objectContaining({ collection: 'some-collection' }), expect.anything());
                    return [2 /*return*/];
            }
        });
    }); });
    it('MSW-700: clicking on background of ImageViewer does not close it', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, _a, el, onClose;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    response = Promise.resolve(new Blob());
                    _a = createFixture(response), el = _a.el, onClose = _a.onClose;
                    return [4 /*yield*/, response];
                case 1:
                    _b.sent();
                    el.simulate('click');
                    expect(onClose).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.spec.js.map