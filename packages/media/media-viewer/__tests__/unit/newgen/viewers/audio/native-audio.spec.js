var _this = this;
import * as tslib_1 from "tslib";
jest.mock('../../../../../newgen/utils/isIE', function () { return ({
    isIE: function () { return true; },
}); });
import * as util from '../../../../../newgen/utils';
var constructAuthTokenUrlSpy = jest.spyOn(util, 'constructAuthTokenUrl');
import * as React from 'react';
import { createContext } from '../../../_stubs';
import { awaitError, mountWithIntlContext, nextTick, } from '@uidu/media-test-helpers';
import { AudioViewer } from '../../../../../newgen/viewers/audio';
import Spinner from '@uidu/spinner';
import { DefaultCoverWrapper, AudioCover } from '../../../../../newgen/styled';
import { ErrorMessage } from '../../../../../newgen/error';
import Button from '@uidu/button';
var token = 'some-token';
var clientId = 'some-client-id';
var baseUrl = 'some-base-url';
var audioItem = {
    id: 'some-id',
    status: 'processed',
    name: 'my audio',
    size: 11222,
    mediaType: 'audio',
    mimeType: 'mp3',
    artifacts: {
        'audio.mp3': {
            url: '/audio',
            processingStatus: 'succeeded',
        },
    },
};
var audioItemWithNoArtifacts = tslib_1.__assign({}, audioItem, { artifacts: {} });
function createFixture(authPromise, collectionName, item) {
    var context = createContext({ authPromise: authPromise });
    var el = mountWithIntlContext(React.createElement(AudioViewer, { context: context, item: item || audioItem, collectionName: collectionName, previewCount: 0 }));
    return { context: context, el: el };
}
describe('Audio viewer', function () {
    afterEach(function () {
        constructAuthTokenUrlSpy.mockClear();
    });
    it('assigns a src for audio files when successful', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var authPromise, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                    el = createFixture(authPromise).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    el.update();
                    expect(el.find('audio').prop('src')).toEqual('some-base-url/audio?client=some-client-id&token=some-token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows spinner when pending', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var authPromise, el;
        return tslib_1.__generator(this, function (_a) {
            authPromise = new Promise(function () { });
            el = createFixture(authPromise).el;
            el.update();
            expect(el.find(Spinner)).toHaveLength(1);
            return [2 /*return*/];
        });
    }); });
    it('shows error message with a download button if there is an error displaying the preview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var authPromise, el, errorMessage;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authPromise = Promise.reject(new Error('test error'));
                    el = createFixture(authPromise).el;
                    return [4 /*yield*/, awaitError(authPromise, 'test error')];
                case 1:
                    _a.sent();
                    el.update();
                    errorMessage = el.find(ErrorMessage);
                    expect(errorMessage).toHaveLength(1);
                    expect(errorMessage.text()).toContain("We couldn't generate a preview for this file");
                    // download button
                    expect(errorMessage.text()).toContain('Try downloading the file to view it');
                    expect(errorMessage.find(Button)).toHaveLength(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows error if no audio artifacts found', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var authPromise, el, errorMessage;
        return tslib_1.__generator(this, function (_a) {
            authPromise = new Promise(function () { });
            el = createFixture(authPromise, undefined, audioItemWithNoArtifacts).el;
            el.update();
            errorMessage = el.find(ErrorMessage);
            expect(errorMessage).toHaveLength(1);
            expect(errorMessage.text()).toContain("We couldn't generate a preview for this file");
            return [2 /*return*/];
        });
    }); });
    describe('cover', function () {
        it('it should show the default cover while the audio cover is loading', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var authPromise, el;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                        el = createFixture(authPromise).el;
                        return [4 /*yield*/, el.instance()['init']()];
                    case 1:
                        _a.sent();
                        el.update();
                        expect(el.find(DefaultCoverWrapper)).toHaveLength(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('it should show the default cover when the audio cover is errored', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var authPromise, el, instance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                        el = createFixture(authPromise).el;
                        instance = el.instance();
                        instance['loadCover'] = function () { return Promise.reject('no cover found'); };
                        return [4 /*yield*/, instance['init']()];
                    case 1:
                        _a.sent();
                        el.update();
                        expect(el.find(DefaultCoverWrapper)).toHaveLength(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('it should show the audio cover if exists', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var authPromise, el, instance, promiseSrc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                        el = createFixture(authPromise).el;
                        instance = el.instance();
                        promiseSrc = Promise.resolve('cover-src');
                        instance['loadCover'] = function () { return promiseSrc; };
                        return [4 /*yield*/, instance['init']()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, promiseSrc];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, nextTick()];
                    case 3:
                        _a.sent();
                        el.update();
                        expect(el.find(DefaultCoverWrapper)).toHaveLength(0);
                        expect(el.find(AudioCover).prop('src')).toEqual('some-base-url/file/some-id/image?client=some-client-id&token=some-token');
                        return [2 /*return*/];
                }
            });
        }); });
        it('MSW-720: pass the collectionName to calls to constructAuthTokenUrl', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var collectionName, authPromise, el, instance, promiseSrc;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        collectionName = 'collectionName';
                        authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                        el = createFixture(authPromise, collectionName).el;
                        instance = el.instance();
                        promiseSrc = Promise.resolve('cover-src');
                        instance['loadCover'] = function () { return promiseSrc; };
                        return [4 /*yield*/, instance['init']()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, promiseSrc];
                    case 2:
                        _a.sent();
                        el.update();
                        expect(constructAuthTokenUrlSpy.mock.calls[0][2]).toEqual(collectionName);
                        expect(constructAuthTokenUrlSpy.mock.calls[1][2]).toEqual(collectionName);
                        return [2 /*return*/];
                }
            });
        }); });
        describe('AutoPlay', function () {
            function createAutoPlayFixture(previewCount) {
                return tslib_1.__awaiter(this, void 0, void 0, function () {
                    var authPromise, context, el, instance;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                                context = createContext({ authPromise: authPromise });
                                el = mountWithIntlContext(React.createElement(AudioViewer, { context: context, item: audioItem, collectionName: "collectionName", previewCount: previewCount }));
                                instance = el.instance();
                                return [4 /*yield*/, instance['init']()];
                            case 1:
                                _a.sent();
                                el.update();
                                return [2 /*return*/, el];
                        }
                    });
                });
            }
            it('should auto play when it is the first preview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var el;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, createAutoPlayFixture(0)];
                        case 1:
                            el = _a.sent();
                            expect(el.find('audio').prop('autoPlay')).toBeTruthy();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('should not auto play when it is not the first preview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var el;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, createAutoPlayFixture(1)];
                        case 1:
                            el = _a.sent();
                            expect(el.find('audio').prop('autoPlay')).toBeFalsy();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
});
//# sourceMappingURL=native-audio.spec.js.map