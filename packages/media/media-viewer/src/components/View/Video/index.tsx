import rafScheduler from 'raf-schd';
import React, { Component } from 'react';
import { Pause, Play } from 'react-feather';
import ProgressBar from './Progress';
import { Button, Footer, Wrapper } from './styled';

type UrlShape = {
  type: 'video/mp4' | 'video/ogg';
  src: string;
};

export type ViewShape = {
  poster: string;
  urls: Array<UrlShape>;
};

type ViewProps = {
  currentIndex: number;
  data: ViewShape;
  interactionIsIdle: boolean;
};
type ViewState = { paused: boolean; progress: number };

function calculateProgress({ currentTime, duration }) {
  return (100 / duration) * currentTime;
}

export default class View extends Component<ViewProps, ViewState> {
  video: HTMLVideoElement;
  state = { paused: true, progress: 0 };

  componentDidMount() {
    this.video.addEventListener('play', this.handlePlay, false);
    this.video.addEventListener('pause', this.handlePause, false);
    this.video.addEventListener('timeupdate', this.handleTimeUpdate, false);
  }

  componentWillUnmount() {
    this.video.removeEventListener('play', this.handlePlay);
    this.video.removeEventListener('pause', this.handlePause);
    this.video.removeEventListener('timeupdate', this.handleTimeUpdate);
  }

  componentWillReceiveProps(nextProps: ViewProps) {
    if (this.props.currentIndex !== nextProps.currentIndex) {
      this.playOrPause('pause');
    }
  }

  handlePlay = () => {
    this.setState({ paused: false });
  };

  handleTimeUpdate = rafScheduler(() => {
    const progress = calculateProgress({
      currentTime: this.video.currentTime,
      duration: this.video.duration,
    });

    this.setState({ progress });
  });

  handlePause = () => {
    this.setState({ paused: true });
  };

  playOrPause = (e, type: 'play' | 'pause' | 'toggle' = 'toggle') => {
    e.preventDefault();
    const { video } = this;

    switch (type) {
      case 'play':
        video.play();
        break;
      case 'pause':
        video.pause();
        break;
      default:
        if (video.paused || video.ended) {
          video.play();
        } else {
          video.pause();
        }
    }
  };
  getVideo = (ref: any) => {
    this.video = ref;
  };

  render() {
    const { data, interactionIsIdle } = this.props;
    const { progress, paused } = this.state;
    const width = 854;

    return (
      <Wrapper width={width}>
        <video
          autoPlay={false}
          controls={false}
          onClick={this.playOrPause}
          poster={data.poster}
          ref={this.getVideo}
          style={{ width: '100%', height: 'auto' }}
        >
          {(data as any).sources.map((vid, idx) => (
            <source key={idx} src={vid.url} type={vid.type} />
          ))}
          Your browser does not support HTML5 video.
        </video>
        {this.video ? (
          <Footer interactionIsIdle={interactionIsIdle}>
            <Button type="button" onClick={this.playOrPause}>
              {paused ? <Play></Play> : <Pause />}
            </Button>
            <ProgressBar progress={progress} />
          </Footer>
        ) : null}
      </Wrapper>
    );
  }
}
