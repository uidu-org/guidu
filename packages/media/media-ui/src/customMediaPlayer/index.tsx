import * as React from 'react';
import { Component } from 'react';
import PlayIcon from '@atlaskit/icon/glyph/vid-play';
import PauseIcon from '@atlaskit/icon/glyph/vid-pause';
import FullScreenIconOn from '@atlaskit/icon/glyph/vid-full-screen-on';
import FullScreenIconOff from '@atlaskit/icon/glyph/vid-full-screen-off';
import SoundIcon from '@atlaskit/icon/glyph/hipchat/outgoing-sound';
import HDIcon from '@atlaskit/icon/glyph/vid-hd-circle';
import Button from '@atlaskit/button';
import Spinner  from '@uidu/spinner';
import MediaPlayer, {
  SetVolumeFunction,
  NavigateFunction,
  VideoState,
  VideoActions,
} from 'react-video-renderer';
import { colors } from '@atlaskit/theme';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import { TimeRange } from './timeRange';
import {
  CurrentTime,
  VideoWrapper,
  CustomVideoWrapper,
  TimebarWrapper,
  VolumeWrapper,
  TimeWrapper,
  LeftControls,
  RightControls,
  ControlsWrapper,
  VolumeToggleWrapper,
  MutedIndicator,
  SpinnerWrapper,
  VolumeTimeRangeWrapper,
} from './styled';
import { formatDuration } from '../formatDuration';
import { hideControlsClassName } from '../classNames';
import { Shortcut, keyCodes } from '../shortcut';
import {
  toggleFullscreen,
  getFullscreenElement,
  vendorify,
} from './fullscreen';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { messages } from '../messages';

export interface CustomMediaPlayerProps {
  readonly type: 'audio' | 'video';
  readonly src: string;
  readonly isHDActive?: boolean;
  readonly onHDToggleClick?: () => void;
  readonly isHDAvailable?: boolean;
  readonly showControls?: () => void;
  readonly isAutoPlay: boolean;
  readonly isShortcutEnabled?: boolean;
}

export interface CustomMediaPlayerState {
  isFullScreenEnabled: boolean;
}

export type ToggleButtonAction = () => void;

export class CustomMediaPlayer extends Component<
  CustomMediaPlayerProps & InjectedIntlProps,
  CustomMediaPlayerState
> {
  videoWrapperRef?: HTMLElement;

  state: CustomMediaPlayerState = {
    isFullScreenEnabled: false,
  };

  componentDidMount() {
    document.addEventListener(
      vendorify('fullscreenchange', false),
      this.onFullScreenChange,
    );
  }

  componentWillUnmount() {
    document.removeEventListener(
      vendorify('fullscreenchange', false),
      this.onFullScreenChange,
    );
  }

  onFullScreenChange = () => {
    const { isFullScreenEnabled: currentFullScreenMode } = this.state;
    const isFullScreenEnabled = getFullscreenElement() ? true : false;

    if (currentFullScreenMode !== isFullScreenEnabled) {
      this.setState({
        isFullScreenEnabled,
      });
    }
  };

  onTimeChange = (navigate: NavigateFunction) => (value: number) => {
    navigate(value);
  };

  onVolumeChange = (setVolume: SetVolumeFunction) => (value: number) =>
    setVolume(value);

  shortcutHandler = (toggleButtonAction: ToggleButtonAction) => () => {
    const { showControls } = this.props;

    toggleButtonAction();

    if (showControls) {
      showControls();
    }
  };

  renderHDButton = () => {
    const { type, isHDAvailable, isHDActive, onHDToggleClick } = this.props;

    if (type === 'audio' || !isHDAvailable) {
      return;
    }
    const primaryColor = isHDActive ? colors.B200 : colors.DN400;
    const secondaryColor = isHDActive ? colors.white : colors.DN60;
    return (
      <Button
        appearance={'toolbar' as any}
        isSelected={isHDActive}
        onClick={onHDToggleClick}
        iconBefore={
          <HDIcon
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            label="hd"
          />
        }
      />
    );
  };

  renderVolume = ({ isMuted, volume }: VideoState, actions: VideoActions) => {
    return (
      <VolumeWrapper>
        <VolumeToggleWrapper isMuted={isMuted}>
          <MutedIndicator isMuted={isMuted} />
          <Button
            appearance={'toolbar' as any}
            onClick={actions.toggleMute}
            iconBefore={<SoundIcon label="volume" />}
          />
        </VolumeToggleWrapper>
        <VolumeTimeRangeWrapper>
          <TimeRange
            onChange={this.onVolumeChange(actions.setVolume)}
            duration={1}
            currentTime={volume}
            bufferedTime={volume}
            disableThumbTooltip={true}
            isAlwaysActive={true}
          />
        </VolumeTimeRangeWrapper>
      </VolumeWrapper>
    );
  };

  onFullScreenClick = () => toggleFullscreen(this.videoWrapperRef);

  saveVideoWrapperRef = (el?: HTMLElement) => (this.videoWrapperRef = el);

  renderFullScreenButton = () => {
    const {
      intl: { formatMessage },
      type,
    } = this.props;

    if (type === 'audio') {
      return;
    }

    const { isFullScreenEnabled } = this.state;
    const icon = isFullScreenEnabled ? (
      <FullScreenIconOff label={formatMessage(messages.disable_fullscreen)} />
    ) : (
      <FullScreenIconOn label={formatMessage(messages.enable_fullscreen)} />
    );

    return (
      <Button
        appearance={'toolbar' as any}
        onClick={this.onFullScreenClick}
        iconBefore={icon}
      />
    );
  };

  renderSpinner = () => (
    <SpinnerWrapper>
      <Spinner invertColor size="large" />
    </SpinnerWrapper>
  );

  render() {
    const {
      type,
      src,
      isAutoPlay,
      isShortcutEnabled,
      intl: { formatMessage },
    } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <CustomVideoWrapper ref={this.saveVideoWrapperRef}>
          <MediaPlayer sourceType={type} src={src} autoPlay={isAutoPlay}>
            {(video, videoState, actions) => {
              const {
                status,
                currentTime,
                buffered,
                duration,
                isLoading,
              } = videoState;
              const isPlaying = status === 'playing';
              const toggleButtonIcon = isPlaying ? (
                <PauseIcon label={formatMessage(messages.play)} />
              ) : (
                <PlayIcon label={formatMessage(messages.pause)} />
              );
              const toggleButtonAction = isPlaying
                ? actions.pause
                : actions.play;
              const button = (
                <Button
                  appearance={'toolbar' as any}
                  iconBefore={toggleButtonIcon}
                  onClick={toggleButtonAction}
                />
              );
              const shortcuts = isShortcutEnabled && [
                <Shortcut
                  key="space-shortcut"
                  keyCode={keyCodes.space}
                  handler={this.shortcutHandler(toggleButtonAction)}
                />,
                <Shortcut
                  key="m-shortcut"
                  keyCode={keyCodes.m}
                  handler={this.shortcutHandler(actions.toggleMute)}
                />,
              ];

              return (
                <VideoWrapper>
                  {video}
                  {isLoading && this.renderSpinner()}
                  {shortcuts}
                  <ControlsWrapper className={hideControlsClassName}>
                    <TimeWrapper>
                      <TimeRange
                        currentTime={currentTime}
                        bufferedTime={buffered}
                        duration={duration}
                        onChange={this.onTimeChange(actions.navigate)}
                      />
                    </TimeWrapper>
                    <TimebarWrapper>
                      <LeftControls>
                        {button}
                        {this.renderVolume(videoState, actions)}
                      </LeftControls>
                      <RightControls>
                        <CurrentTime draggable={false}>
                          {formatDuration(currentTime)} /{' '}
                          {formatDuration(duration)}
                        </CurrentTime>
                        {this.renderHDButton()}
                        {this.renderFullScreenButton()}
                      </RightControls>
                    </TimebarWrapper>
                  </ControlsWrapper>
                </VideoWrapper>
              );
            }}
          </MediaPlayer>
        </CustomVideoWrapper>
      </ThemeProvider>
    );
  }
}

export default injectIntl(CustomMediaPlayer);
