var _this = this;
import * as tslib_1 from "tslib";
import { setState as setInteractiveImgState, InteractiveImg as InteractiveImgMock, } from '../../../../mocks/_interactive-img';
var mockInteractiveImg = {
    InteractiveImg: InteractiveImgMock,
};
jest.mock('../../../../../newgen/viewers/image/interactive-img', function () { return mockInteractiveImg; });
import * as React from 'react';
import { awaitError, mountWithIntlContext, fakeContext, } from '@uidu/media-test-helpers';
import { ImageViewer } from '../../../../../newgen/viewers/image';
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
export function createFixture(response) {
    var context = fakeContext();
    context.getImage.mockReturnValue(response);
    var onClose = jest.fn();
    var onLoaded = jest.fn();
    var el = mountWithIntlContext(React.createElement(ImageViewer, { context: context, item: imageItem, collectionName: collectionName, onClose: onClose, onLoad: onLoaded }));
    return { context: context, el: el, onClose: onClose };
}
describe('ImageViewer analytics', function () {
    it('should call onLoad with success', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setInteractiveImgState('success');
                    response = Promise.resolve(new Blob());
                    el = createFixture(response).el;
                    return [4 /*yield*/, response];
                case 1:
                    _a.sent();
                    expect(el.prop('onLoad')).toHaveBeenCalledWith({ status: 'success' });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call onLoad with error if interactive-img fails', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setInteractiveImgState('error');
                    response = Promise.resolve(new Blob());
                    el = createFixture(response).el;
                    return [4 /*yield*/, response];
                case 1:
                    _a.sent();
                    expect(el.prop('onLoad')).toHaveBeenCalledWith({
                        status: 'error',
                        errorMessage: 'Interactive-img render failed',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it('should call onLoad with error if there is an error fetching metadata', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var response, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response = Promise.reject(new Error('test_error'));
                    el = createFixture(response).el;
                    return [4 /*yield*/, awaitError(response, 'test_error')];
                case 1:
                    _a.sent();
                    expect(el.prop('onLoad')).toHaveBeenCalledWith({
                        status: 'error',
                        errorMessage: 'test_error',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=analytics.spec.js.map