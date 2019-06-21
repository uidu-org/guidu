import React, { Fragment, PureComponent } from 'react';
import { fakeFile, fakeImage, fakeLink, fakeVideo } from '../example-helpers';
import MediaCard from '../src';

export default class Basic extends PureComponent {
  render() {
    return (
      <Fragment>
        <MediaCard file={fakeImage()} />
        <MediaCard file={fakeVideo()} />
        <MediaCard file={fakeFile()} />
        <MediaCard file={fakeLink()} />
      </Fragment>
    );
  }
}
