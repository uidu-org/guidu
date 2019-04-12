import * as tslib_1 from "tslib";
import * as React from 'react';
import AudioIcon from '@atlaskit/icon/glyph/media-services/audio';
import { constructAuthTokenUrl } from '../utils';
import { Outcome } from '../domain';
import { AudioPlayer, AudioCover, Audio, DefaultCoverWrapper, blanketColor, CustomAudioPlayerWrapper, } from '../styled';
import { createError } from '../error';
import { getArtifactUrl } from '@uidu/media-store';
import { BaseViewer } from './base-viewer';
import { isIE } from '../utils/isIE';
import { CustomMediaPlayer } from '@uidu/media-ui';
import { getObjectUrlFromFileState } from '../utils/getObjectUrlFromFileState';
var defaultCover = (React.createElement(DefaultCoverWrapper, null,
    React.createElement(AudioIcon, { label: "cover", size: "xlarge", primaryColor: blanketColor })));
var getCoverUrl = function (item, context, collectionName) {
    return constructAuthTokenUrl("/file/" + item.id + "/image", context, collectionName);
};
var AudioViewer = /** @class */ (function (_super) {
    tslib_1.__extends(AudioViewer, _super);
    function AudioViewer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderCover = function () {
            var item = _this.props.item;
            var coverUrl = _this.state.coverUrl;
            if (coverUrl && item.status !== 'error') {
                return React.createElement(AudioCover, { src: coverUrl, alt: item.name });
            }
            else {
                return defaultCover;
            }
        };
        _this.saveAudioElement = function (audioElement) {
            if (!audioElement) {
                return;
            }
            audioElement.setAttribute('controlsList', 'nodownload');
        };
        _this.loadCover = function (coverUrl) {
            return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var img;
                return tslib_1.__generator(this, function (_a) {
                    img = new Image();
                    img.src = coverUrl;
                    img.onload = resolve;
                    img.onerror = reject;
                    return [2 /*return*/];
                });
            }); });
        };
        _this.setCoverUrl = function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a, context, item, collectionName, coverUrl, e_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, context = _a.context, item = _a.item, collectionName = _a.collectionName;
                        if (item.status !== 'processed') {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, getCoverUrl(item, context, collectionName)];
                    case 1:
                        coverUrl = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.loadCover(coverUrl)];
                    case 3:
                        _b.sent();
                        this.setState({ coverUrl: coverUrl });
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _b.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    Object.defineProperty(AudioViewer.prototype, "initialState", {
        get: function () {
            return {
                content: Outcome.pending(),
            };
        },
        enumerable: true,
        configurable: true
    });
    AudioViewer.prototype.renderSuccessful = function (src) {
        var _a = this.props, showControls = _a.showControls, previewCount = _a.previewCount;
        var useCustomAudioPlayer = !isIE();
        var isAutoPlay = previewCount === 0;
        return useCustomAudioPlayer ? (React.createElement(AudioPlayer, null,
            this.renderCover(),
            React.createElement(CustomAudioPlayerWrapper, null,
                React.createElement(CustomMediaPlayer, { type: "audio", isAutoPlay: isAutoPlay, src: src, isShortcutEnabled: true, showControls: showControls })))) : (React.createElement(AudioPlayer, null,
            this.renderCover(),
            React.createElement(CustomAudioPlayerWrapper, null,
                React.createElement(Audio, { autoPlay: isAutoPlay, controls: true, ref: this.saveAudioElement, src: src, preload: "metadata" }))));
    };
    AudioViewer.prototype.init = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, context, item, collectionName, audioUrl, artifactUrl, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, context = _a.context, item = _a.item, collectionName = _a.collectionName;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        audioUrl = void 0;
                        if (!(item.status === 'processed')) return [3 /*break*/, 3];
                        artifactUrl = getArtifactUrl(item.artifacts, 'audio.mp3');
                        if (!artifactUrl) {
                            throw new Error('No audio artifacts found');
                        }
                        return [4 /*yield*/, constructAuthTokenUrl(artifactUrl, context, collectionName)];
                    case 2:
                        audioUrl = _b.sent();
                        if (!audioUrl) {
                            throw new Error('No audio artifacts found');
                        }
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, getObjectUrlFromFileState(item)];
                    case 4:
                        audioUrl = _b.sent();
                        if (!audioUrl) {
                            this.setState({
                                content: Outcome.pending(),
                            });
                            return [2 /*return*/];
                        }
                        _b.label = 5;
                    case 5:
                        this.setCoverUrl();
                        this.setState({
                            content: Outcome.successful(audioUrl),
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _b.sent();
                        this.setState({
                            content: Outcome.failed(createError('previewFailed', err_1, item)),
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AudioViewer.prototype.release = function () {
        var content = this.state.content;
        if (!content.data) {
            return;
        }
        URL.revokeObjectURL(content.data);
    };
    return AudioViewer;
}(BaseViewer));
export { AudioViewer };
//# sourceMappingURL=audio.js.map