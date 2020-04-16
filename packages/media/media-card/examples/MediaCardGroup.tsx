import React, { PureComponent } from 'react';
import { fakeImage } from '../example-helpers';
import { MediaCardGroup } from '../src';

export default class Basic extends PureComponent {
  render() {
    const onlyImages = Array.from(Array(5).keys()).map((i) => fakeImage().file);
    return (
      <>
        {/* <MediaCardGroup files={onlyImages} layout="slider" /> */}
        <MediaCardGroup
          files={onlyImages}
          layout="grid"
          gridOptions={{
            layout: [
              [3, 2],
              [2, 2],
              [2, 1],
              [2, 1],
            ],
          }}
        />
      </>
    );
  }
}
