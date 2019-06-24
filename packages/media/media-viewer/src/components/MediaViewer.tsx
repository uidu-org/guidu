import React, { PureComponent } from 'react';
import Carousel from 'react-images';
import Header from './Header';

export default class MediaViewer extends PureComponent<any> {
  render() {
    const { views, currentIndex } = this.props;

    return (
      <Carousel
        currentIndex={currentIndex || 0}
        components={{
          Footer: null,
          Header,
        }}
        isFullscreen
        frameProps={{ autoSize: 'height' }}
        views={views}
        styles={{
          container: (base: any) => ({
            ...base,
            height: '100vh',
          }),
          view: (base: any) => ({
            ...base,
            alignItems: 'center',
            display: 'flex ',
            height: 'calc(100vh - 54px)',
            justifyContent: 'center',

            // [largeDevice]: {
            //   padding: 20,
            // },

            '& > img': {
              maxHeight: 'calc(100vh - 94px)',
            },
          }),
          // navigationPrev: navButtonStyles,
          // navigationNext: navButtonStyles,
        }}
      />
    );
  }
}
