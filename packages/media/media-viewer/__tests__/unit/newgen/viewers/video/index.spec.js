var _this = this;
import * as tslib_1 from "tslib";
import * as util from '../../../../../newgen/utils';
var constructAuthTokenUrlSpy = jest.spyOn(util, 'constructAuthTokenUrl');
import * as React from 'react';
import Button from '@uidu/button';
import Spinner from '@uidu/spinner';
import { awaitError, mountWithIntlContext } from '@uidu/media-test-helpers';
import { CustomMediaPlayer } from '@uidu/media-ui';
import { createContext } from '../../../_stubs';
import { VideoViewer } from '../../../../../newgen/viewers/video';
import { ErrorMessage } from '../../../../../newgen/error';
var token = 'some-token';
var clientId = 'some-client-id';
var baseUrl = 'some-base-url';
var videoItem = {
    id: 'some-id',
    status: 'processed',
    name: 'my video',
    size: 11222,
    mediaType: 'video',
    mimeType: 'mp4',
    artifacts: {
        'video_640.mp4': {
            url: '/video',
            processingStatus: 'succeeded',
        },
        'video_1280.mp4': {
            url: '/video_hd',
            processingStatus: 'succeeded',
        },
    },
};
var sdVideoItem = {
    id: 'some-id',
    status: 'processed',
    name: 'my video',
    size: 11222,
    mediaType: 'video',
    mimeType: 'mp4',
    artifacts: {
        'video_640.mp4': {
            url: '/video',
            processingStatus: 'succeeded',
        },
    },
};
var videoItemWithNoArtifacts = tslib_1.__assign({}, videoItem, { artifacts: {} });
function createFixture(authPromise, props, item) {
    var context = createContext({ authPromise: authPromise });
    var el = mountWithIntlContext(React.createElement(VideoViewer, tslib_1.__assign({ context: context, item: item || videoItem }, props, { previewCount: 0 })));
    return { context: context, el: el };
}
describe('Video viewer', function () {
    afterEach(function () {
        constructAuthTokenUrlSpy.mockClear();
        localStorage.clear();
        localStorage.setItem.mockClear();
    });
    it('assigns a src for videos when successful', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                    expect(el.find(CustomMediaPlayer).prop('src')).toEqual('some-base-url/video_hd?client=some-client-id&token=some-token');
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
    it('shows error message if there is an error generating the preview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                    expect(el.find(ErrorMessage)).toHaveLength(1);
                    errorMessage = el.find(ErrorMessage);
                    expect(errorMessage).toHaveLength(1);
                    expect(errorMessage.text()).toContain("We couldn't generate a preview for this file");
                    // download button:
                    expect(errorMessage.text()).toContain('Try downloading the file to view it.');
                    expect(errorMessage.find(Button)).toHaveLength(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('shows error message when there are not video artifacts in the media item', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var authPromise, el, errorMessage;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                    el = createFixture(authPromise, {}, videoItemWithNoArtifacts).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    el.update();
                    errorMessage = el.find(ErrorMessage);
                    expect(errorMessage).toHaveLength(1);
                    expect(errorMessage.text()).toContain("We couldn't generate a preview for this file");
                    return [2 /*return*/];
            }
        });
    }); });
    it('MSW-720: passes collectionName to constructAuthTokenUrl', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var collectionName, authPromise, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    collectionName = 'some-collection';
                    authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                    el = createFixture(authPromise, { collectionName: collectionName }).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    el.update();
                    expect(constructAuthTokenUrlSpy.mock.calls[0][2]).toEqual(collectionName);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should render a custom video player if the feature flag is active', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                    expect(el.find(CustomMediaPlayer)).toHaveLength(1);
                    expect(el.find(CustomMediaPlayer).prop('src')).toEqual('some-base-url/video_hd?client=some-client-id&token=some-token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should toggle hd when button is clicked', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                    expect(el.state('isHDActive')).toBeTruthy();
                    el.find(Button)
                        .at(2)
                        .simulate('click');
                    expect(el.state('isHDActive')).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should default to hd if available', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
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
                    expect(el.state('isHDActive')).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should default to sd if hd is not available', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var authPromise, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                    el = createFixture(authPromise, {}, sdVideoItem).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    el.update();
                    expect(el.state('isHDActive')).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should save video quality when changes', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var authPromise, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                    el = createFixture(authPromise, {}).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    el.update();
                    el.find(Button)
                        .at(2)
                        .simulate('click');
                    expect(localStorage.setItem).toBeCalledWith('mv_video_player_quality', 'sd');
                    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should default to sd if previous quality was sd', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var authPromise, el;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localStorage.setItem('mv_video_player_quality', 'sd');
                    authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                    el = createFixture(authPromise, {}).el;
                    return [4 /*yield*/, el.instance()['init']()];
                case 1:
                    _a.sent();
                    el.update();
                    expect(el.state('isHDActive')).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('AutoPlay', function () {
        function createAutoPlayFixture(previewCount) {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var authPromise, context, el;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            authPromise = Promise.resolve({ token: token, clientId: clientId, baseUrl: baseUrl });
                            context = createContext({ authPromise: authPromise });
                            el = mountWithIntlContext(React.createElement(VideoViewer, { context: context, previewCount: previewCount, item: videoItem }));
                            return [4 /*yield*/, el.instance()['init']()];
                        case 1:
                            _a.sent();
                            el.update();
                            return [2 /*return*/, el];
                    }
                });
            });
        }
        it('should auto play video viewer when it is the first preview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var el;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createAutoPlayFixture(0)];
                    case 1:
                        el = _a.sent();
                        expect(el.find(CustomMediaPlayer)).toHaveLength(1);
                        expect(el.find({ autoPlay: true })).toHaveLength(2);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should not auto play video viewer when it is not the first preview', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var el;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, createAutoPlayFixture(1)];
                    case 1:
                        el = _a.sent();
                        expect(el.find(CustomMediaPlayer)).toHaveLength(1);
                        expect(el.find({ autoPlay: true })).toHaveLength(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=index.spec.js.map