import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import PlayIcon from '@atlaskit/icon/glyph/vid-play';
import PauseIcon from '@atlaskit/icon/glyph/vid-pause';
import FullScreenIconOn from '@atlaskit/icon/glyph/vid-full-screen-on';
import FullScreenIconOff from '@atlaskit/icon/glyph/vid-full-screen-off';
import SoundIcon from '@atlaskit/icon/glyph/hipchat/outgoing-sound';
import HDIcon from '@atlaskit/icon/glyph/vid-hd-circle';
import Button from '@uidu/button';
import Spinner from '@uidu/spinner';
import MediaPlayer from 'react-video-renderer';
import { colors } from '@uidu/theme';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { TimeRange } from './timeRange';
import { CurrentTime, VideoWrapper, CustomVideoWrapper, TimebarWrapper, VolumeWrapper, TimeWrapper, LeftControls, RightControls, ControlsWrapper, VolumeToggleWrapper, MutedIndicator, SpinnerWrapper, VolumeTimeRangeWrapper, } from './styled';
import { formatDuration } from '../formatDuration';
import { hideControlsClassName } from '../classNames';
import { Shortcut, keyCodes } from '../shortcut';
import { toggleFullscreen, getFullscreenElement, vendorify, } from './fullscreen';
import { injectIntl } from 'react-intl';
import { messages } from '../messages';
var CustomMediaPlayer = /** @class */ (function (_super) {
    tslib_1.__extends(CustomMediaPlayer, _super);
    function CustomMediaPlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isFullScreenEnabled: false,
        };
        _this.onFullScreenChange = function () {
            var currentFullScreenMode = _this.state.isFullScreenEnabled;
            var isFullScreenEnabled = getFullscreenElement() ? true : false;
            if (currentFullScreenMode !== isFullScreenEnabled) {
                _this.setState({
                    isFullScreenEnabled: isFullScreenEnabled,
                });
            }
        };
        _this.onTimeChange = function (navigate) { return function (value) {
            navigate(value);
        }; };
        _this.onVolumeChange = function (setVolume) { return function (value) {
            return setVolume(value);
        }; };
        _this.shortcutHandler = function (toggleButtonAction) { return function () {
            var showControls = _this.props.showControls;
            toggleButtonAction();
            if (showControls) {
                showControls();
            }
        }; };
        _this.renderHDButton = function () {
            var _a = _this.props, type = _a.type, isHDAvailable = _a.isHDAvailable, isHDActive = _a.isHDActive, onHDToggleClick = _a.onHDToggleClick;
            if (type === 'audio' || !isHDAvailable) {
                return;
            }
            var primaryColor = isHDActive ? colors.B200 : colors.DN400;
            var secondaryColor = isHDActive ? colors.white : colors.DN60;
            return (React.createElement(Button, { appearance: 'toolbar', isSelected: isHDActive, onClick: onHDToggleClick, iconBefore: React.createElement(HDIcon, { primaryColor: primaryColor, secondaryColor: secondaryColor, label: "hd" }) }));
        };
        _this.renderVolume = function (_a, actions) {
            var isMuted = _a.isMuted, volume = _a.volume;
            return (React.createElement(VolumeWrapper, null,
                React.createElement(VolumeToggleWrapper, { isMuted: isMuted },
                    React.createElement(MutedIndicator, { isMuted: isMuted }),
                    React.createElement(Button, { appearance: 'toolbar', onClick: actions.toggleMute, iconBefore: React.createElement(SoundIcon, { label: "volume" }) })),
                React.createElement(VolumeTimeRangeWrapper, null,
                    React.createElement(TimeRange, { onChange: _this.onVolumeChange(actions.setVolume), duration: 1, currentTime: volume, bufferedTime: volume, disableThumbTooltip: true, isAlwaysActive: true }))));
        };
        _this.onFullScreenClick = function () { return toggleFullscreen(_this.videoWrapperRef); };
        _this.saveVideoWrapperRef = function (el) { return (_this.videoWrapperRef = el); };
        _this.renderFullScreenButton = function () {
            var _a = _this.props, formatMessage = _a.intl.formatMessage, type = _a.type;
            if (type === 'audio') {
                return;
            }
            var isFullScreenEnabled = _this.state.isFullScreenEnabled;
            var icon = isFullScreenEnabled ? (React.createElement(FullScreenIconOff, { label: formatMessage(messages.disable_fullscreen) })) : (React.createElement(FullScreenIconOn, { label: formatMessage(messages.enable_fullscreen) }));
            return (React.createElement(Button, { appearance: 'toolbar', onClick: _this.onFullScreenClick, iconBefore: icon }));
        };
        _this.renderSpinner = function () { return (React.createElement(SpinnerWrapper, null,
            React.createElement(Spinner, { invertColor: true, size: "large" }))); };
        return _this;
    }
    CustomMediaPlayer.prototype.componentDidMount = function () {
        document.addEventListener(vendorify('fullscreenchange', false), this.onFullScreenChange);
    };
    CustomMediaPlayer.prototype.componentWillUnmount = function () {
        document.removeEventListener(vendorify('fullscreenchange', false), this.onFullScreenChange);
    };
    CustomMediaPlayer.prototype.render = function () {
        var _this = this;
        var _a = this.props, type = _a.type, src = _a.src, isAutoPlay = _a.isAutoPlay, isShortcutEnabled = _a.isShortcutEnabled, formatMessage = _a.intl.formatMessage;
        return (React.createElement(ThemeProvider, { theme: theme },
            React.createElement(CustomVideoWrapper, { ref: this.saveVideoWrapperRef },
                React.createElement(MediaPlayer, { sourceType: type, src: src, autoPlay: isAutoPlay }, function (video, videoState, actions) {
                    var status = videoState.status, currentTime = videoState.currentTime, buffered = videoState.buffered, duration = videoState.duration, isLoading = videoState.isLoading;
                    var isPlaying = status === 'playing';
                    var toggleButtonIcon = isPlaying ? (React.createElement(PauseIcon, { label: formatMessage(messages.play) })) : (React.createElement(PlayIcon, { label: formatMessage(messages.pause) }));
                    var toggleButtonAction = isPlaying
                        ? actions.pause
                        : actions.play;
                    var button = (React.createElement(Button, { appearance: 'toolbar', iconBefore: toggleButtonIcon, onClick: toggleButtonAction }));
                    var shortcuts = isShortcutEnabled && [
                        React.createElement(Shortcut, { key: "space-shortcut", keyCode: keyCodes.space, handler: _this.shortcutHandler(toggleButtonAction) }),
                        React.createElement(Shortcut, { key: "m-shortcut", keyCode: keyCodes.m, handler: _this.shortcutHandler(actions.toggleMute) }),
                    ];
                    return (React.createElement(VideoWrapper, null,
                        video,
                        isLoading && _this.renderSpinner(),
                        shortcuts,
                        React.createElement(ControlsWrapper, { className: hideControlsClassName },
                            React.createElement(TimeWrapper, null,
                                React.createElement(TimeRange, { currentTime: currentTime, bufferedTime: buffered, duration: duration, onChange: _this.onTimeChange(actions.navigate) })),
                            React.createElement(TimebarWrapper, null,
                                React.createElement(LeftControls, null,
                                    button,
                                    _this.renderVolume(videoState, actions)),
                                React.createElement(RightControls, null,
                                    React.createElement(CurrentTime, { draggable: false },
                                        formatDuration(currentTime),
                                        " /",
                                        ' ',
                                        formatDuration(duration)),
                                    _this.renderHDButton(),
                                    _this.renderFullScreenButton())))));
                }))));
    };
    return CustomMediaPlayer;
}(Component));
export { CustomMediaPlayer };
export default injectIntl(CustomMediaPlayer);
//# sourceMappingURL=index.js.map