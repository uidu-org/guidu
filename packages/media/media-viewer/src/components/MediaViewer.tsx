import { ShellMain } from '@uidu/shell';
import React, { PureComponent } from 'react';
import Carousel from 'react-images';
import { NavigationNext, NavigationPrev } from './Navigation';
import Sidebar from './Sidebar';
import View from './View';

export default class MediaViewer extends PureComponent<any, any> {
  static defaultProps = {
    currentIndex: 0,
  };

  constructor(props) {
    super(props);
    const { views, currentIndex } = this.props;
    this.state = {
      currentView: views[currentIndex],
    };
  }

  onViewChange = (index: number) => {
    const { views } = this.props;
    this.setState({ currentView: views[index] });
  };

  render() {
    const { views, currentIndex } = this.props;
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
          views={views}
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
