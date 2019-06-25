import React, { Fragment, PureComponent } from 'react';
import { fakeFile, fakeImage, fakeLink, fakeVideo } from '../example-helpers';
import MediaCard from '../src';

export default class Basic extends PureComponent {
  render() {
    return (
      <Fragment>
        <div style={{ width: '200px' }}>
          <MediaCard file={fakeImage()} />
        </div>
        <div style={{ width: '200px' }}>
          <MediaCard file={fakeVideo()} />
        </div>
        <div style={{ width: '200px' }}>
          <MediaCard file={fakeFile()} />
        </div>
        <div style={{ width: '200px' }}>
          <MediaCard file={fakeLink()} />
        </div>
      </Fragment>
    );
  }
}
