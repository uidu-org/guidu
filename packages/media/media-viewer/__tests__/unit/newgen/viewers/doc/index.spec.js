var _this = this;
import * as tslib_1 from "tslib";
import * as util from '../../../../../newgen/utils';
var constructAuthTokenUrlSpy = jest.spyOn(util, 'constructAuthTokenUrl');
import * as React from 'react';
import { createContext } from '../../../_stubs';
import { Spinner } from '../../../../../newgen/loading';
import { DocViewer } from '../../../../../newgen/viewers/doc/index';
import { ErrorMessage, createError } from '../../../../../newgen/error';
import Button from '@uidu/button';
import { mountWithIntlContext } from '@uidu/media-test-helpers';
function createFixture(fetchPromise, item, collectionName) {
    var context = createContext(undefined);
    var onClose = jest.fn(function () { return fetchPromise; });
    var el = mountWithIntlContext(React.createElement(DocViewer, { item: item, context: context, collectionName: collectionName }));
    el.instance()['fetch'] = jest.fn();
    return { context: context, el: el, onClose: onClose };
}
var item = {
    id: 'some-id',
    status: 'processed',
    name: 'my pdf',
    size: 11222,
    mediaType: 'video',
    mimeType: 'mp4',
    artifacts: {
        'document.pdf': {
            url: '/pdf',
            processingStatus: 'succeeded',
        },
    },
};
var itemWithNoArtifacts = tslib_1.__assign({}, item, { artifacts: {} });
describe('DocViewer', function () {
    afterEach(function () {
        constructAuthTokenUrlSpy.mockClear();
    });
    it('assigns a document content when successful', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fetchPromise, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetchPromise = Promise.resolve();
                    el = createFixture(fetchPromise, item).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    expect(el.state().content.status).toEqual('SUCCESSFUL');
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows an indicator while loading', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fetchPromise, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetchPromise = new Promise(function () { });
                    el = createFixture(fetchPromise, item).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    expect(el.find(Spinner)).toHaveLength(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows an error message and download button if no artifact found', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var fetchPromise, el, content, errorMessage;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fetchPromise = Promise.resolve(function () { });
                    el = createFixture(fetchPromise, itemWithNoArtifacts).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    content = el.state().content;
                    expect(content.status).toEqual('FAILED');
                    expect(content.err).toEqual(createError('noPDFArtifactsFound', undefined, itemWithNoArtifacts));
                    errorMessage = el.find(ErrorMessage);
                    expect(errorMessage).toHaveLength(1);
                    expect(errorMessage.text()).toContain('No PDF artifacts found for this file.');
                    // download button
                    expect(errorMessage.text()).toContain('Try downloading the file to view it');
                    expect(errorMessage.find(Button)).toHaveLength(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('MSW-720: passes collectionName to constructAuthTokenUrl', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var collectionName, fetchPromise, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collectionName = 'some-collection';
                    fetchPromise = Promise.resolve();
                    el = createFixture(fetchPromise, item, collectionName).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    expect(constructAuthTokenUrlSpy.mock.calls[0][2]).toEqual(collectionName);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.spec.js.map