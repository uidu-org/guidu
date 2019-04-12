var _this = this;
import * as tslib_1 from "tslib";
import { constructAuthTokenUrl, getSelectedIndex, } from '../../../../newgen/utils';
import { createContext } from '../../_stubs';
var token = 'some-token';
var baseUrl = 'some-base-url';
describe('utils', function () {
    describe('constructAuthTokenUrl', function () {
        it('should add auth token and client query parameters to the url when auth is client based', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, authPromise, context, url;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientId = 'some-client-id';
                        authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                        context = createContext({ authPromise: authPromise });
                        return [4 /*yield*/, constructAuthTokenUrl('/file/3333-4444-5555', context, 'mycollection')];
                    case 1:
                        url = _a.sent();
                        expect(url).toEqual('some-base-url/file/3333-4444-5555?client=some-client-id&collection=mycollection&token=some-token');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should work with urls with params', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, authPromise, context, url;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientId = 'some-client-id';
                        authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                        context = createContext({ authPromise: authPromise });
                        return [4 /*yield*/, constructAuthTokenUrl('/file/3333-4444-5555?version=1', context, 'mycollection')];
                    case 1:
                        url = _a.sent();
                        expect(url).toEqual('some-base-url/file/3333-4444-5555?version=1&client=some-client-id&collection=mycollection&token=some-token');
                        return [2 /*return*/];
                }
            });
        }); });
        it('should add the auth token to the url when auth type is ASAP', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var issuer, authPromise, context, url;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        issuer = 'some-issuer';
                        authPromise = Promise.resolve({
                            token: token,
                            asapIssuer: issuer,
                            baseUrl: baseUrl,
                        });
                        context = createContext({ authPromise: authPromise });
                        return [4 /*yield*/, constructAuthTokenUrl('/file/3333-4444-5555', context, 'mycollection')];
                    case 1:
                        url = _a.sent();
                        expect(url).toEqual('some-base-url/file/3333-4444-5555?collection=mycollection&issuer=some-issuer&token=some-token');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('getSelectedIndex', function () {
        it('should return the right index if item is found', function () {
            var identifier = {
                id: 'some-id',
                occurrenceKey: 'some-custom-occurrence-key',
                mediaItemType: 'file',
            };
            var identifier2 = {
                id: 'some-id-2',
                occurrenceKey: 'some-custom-occurrence-key',
                mediaItemType: 'file',
            };
            var items = [identifier, identifier2];
            expect(getSelectedIndex(items, identifier)).toEqual(0);
        });
        it('should return -1 if item is not found', function () {
            var identifier = {
                id: 'some-id',
                occurrenceKey: 'some-custom-occurrence-key',
                mediaItemType: 'file',
            };
            var identifier2 = {
                id: 'some-id-2',
                occurrenceKey: 'some-custom-occurrence-key',
                mediaItemType: 'file',
            };
            var notFoundIdentifier = {
                id: 'some-id-not-found',
                occurrenceKey: 'some-custom-occurrence-key',
                mediaItemType: 'file',
            };
            var items = [identifier, identifier2];
            expect(getSelectedIndex(items, notFoundIdentifier)).toEqual(-1);
        });
    });
});
//# sourceMappingURL=index.spec.js.map