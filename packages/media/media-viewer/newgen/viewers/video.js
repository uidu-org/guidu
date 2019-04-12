import * as tslib_1 from "tslib";
import * as React from 'react';
import { getArtifactUrl } from '@uidu/media-store';
import { CustomMediaPlayer } from '@uidu/media-ui';
import { constructAuthTokenUrl } from '../utils';
import { Outcome } from '../domain';
import { Video, CustomVideoPlayerWrapper } from '../styled';
import { isIE } from '../utils/isIE';
import { createError } from '../error';
import { BaseViewer } from './base-viewer';
import { getObjectUrlFromFileState } from '../utils/getObjectUrlFromFileState';
var sdArtifact = 'video_640.mp4';
var hdArtifact = 'video_1280.mp4';
var localStorageKeyName = 'mv_video_player_quality';
var VideoViewer = /** @class */ (function (_super) {
    tslib_1.__extends(VideoViewer, _super);
    function VideoViewer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onHDChange = function () {
            var isHDActive = !_this.state.isHDActive;
            var preferredQuality = isHDActive ? 'hd' : 'sd';
            localStorage.setItem(localStorageKeyName, preferredQuality);
            _this.setState({ isHDActive: isHDActive });
            _this.init(isHDActive);
        };
        return _this;
    }
    Object.defineProperty(VideoViewer.prototype, "initialState", {
        get: function () {
            var item = this.props.item;
            var preferredQuality = localStorage.getItem(localStorageKeyName);
            return {
                content: Outcome.pending(),
                isHDActive: isHDAvailable(item) && preferredQuality !== 'sd',
            };
        },
        enumerable: true,
        configurable: true
    });
    VideoViewer.prototype.renderSuccessful = function (content) {
        var isHDActive = this.state.isHDActive;
        var _a = this.props, item = _a.item, showControls = _a.showControls, previewCount = _a.previewCount;
        var useCustomVideoPlayer = !isIE();
        var isAutoPlay = previewCount === 0;
        return useCustomVideoPlayer ? (React.createElement(CustomVideoPlayerWrapper, null,
            React.createElement(CustomMediaPlayer, { type: "video", isAutoPlay: isAutoPlay, onHDToggleClick: this.onHDChange, showControls: showControls, src: content, isHDActive: isHDActive, isHDAvailable: isHDAvailable(item), isShortcutEnabled: true }))) : (React.createElement(Video, { autoPlay: isAutoPlay, controls: true, src: content }));
    };
    VideoViewer.prototype.init = function (isHDActive) {
        if (isHDActive === void 0) { isHDActive = this.state.isHDActive; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, context, item, collectionName, contentUrl, preferHd, artifactUrl, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, context = _a.context, item = _a.item, collectionName = _a.collectionName;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        contentUrl = void 0;
                        if (!(item.status === 'processed')) return [3 /*break*/, 3];
                        preferHd = isHDActive && isHDAvailable(item);
                        artifactUrl = getVideoArtifactUrl(item, preferHd);
                        if (!artifactUrl) {
                            throw new Error("No video artifacts found");
                        }
                        return [4 /*yield*/, constructAuthTokenUrl(artifactUrl, context, collectionName)];
                    case 2:
                        contentUrl = _b.sent();
                        if (!contentUrl) {
                            throw new Error("No video artifacts found");
                        }
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, getObjectUrlFromFileState(item)];
                    case 4:
                        contentUrl = _b.sent();
                        if (!contentUrl) {
                            this.setState({
                                content: Outcome.pending(),
                            });
                            return [2 /*return*/];
                        }
                        _b.label = 5;
                    case 5:
                        this.setState({
                            content: Outcome.successful(contentUrl),
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
    VideoViewer.prototype.release = function () { };
    return VideoViewer;
}(BaseViewer));
export { VideoViewer };
function isHDAvailable(file) {
    if (file.status !== 'processed') {
        return false;
    }
    return !!getArtifactUrl(file.artifacts, hdArtifact);
}
function getVideoArtifactUrl(file, preferHd) {
    var artifactName = preferHd ? hdArtifact : sdArtifact;
    return getArtifactUrl(file.artifacts, artifactName);
}
//# sourceMappingURL=video.js.map