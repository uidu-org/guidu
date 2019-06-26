import { ShellMain } from '@uidu/shell';
import React, { PureComponent } from 'react';
import Carousel from 'react-images';
import { MediaViewerProps, MediaViewerState } from '../types';
import { NavigationNext, NavigationPrev } from './Navigation';
import Sidebar from './Sidebar';
import View from './View';

export default class MediaViewer extends PureComponent<
  MediaViewerProps,
  MediaViewerState
> {
  static defaultProps = {
    currentIndex: 0,
  };

  constructor(props) {
    super(props);
    const { files, currentIndex } = this.props;
    this.state = {
      currentView: files[currentIndex],
    };
  }

  onViewChange = (index: number) => {
    const { files } = this.props;
    this.setState({ currentView: files[index] });
  };

  render() {
    const { files, currentIndex } = this.props;
    const { currentView } = this.state;

    return (
      <ShellMain className="flex-row">
        <Carousel
          trackProps={{
            onViewChange: this.onViewChange,
          }}
          currentIndex={currentIndex}
          components={{
            Footer: null,
            NavigationPrev,
            NavigationNext,
            View,
          }}
          isFullscreen
          frameProps={{ autoSize: 'height' }}
          views={files}
          styles={{
            container: (base: any) => ({
              ...base,
              height: '100vh',
              flex: 1,
            }),
            view: (base: any) => ({
              ...base,
              backgroundColor: 'black',
              alignItems: 'center',
              display: 'flex ',
              height: '100vh',
              justifyContent: 'center',
              '& > img': {
                maxHeight: '100vh',
              },
            }),
          }}
        />
        <Sidebar {...this.props} currentView={currentView} />
      </ShellMain>
    );
  }
}
