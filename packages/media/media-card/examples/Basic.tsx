import React, { PureComponent } from 'react';
import { fakeImage, fakeLink, fakePdf, fakeVideo } from '../examples-utils';
import MediaCard from '../src';

export default class Basic extends PureComponent {
  render() {
    return (
      <div className="card-columns">
        <MediaCard file={fakeImage().file} />
        <MediaCard file={fakeVideo().file} />
        <MediaCard file={fakePdf().file} />
        <MediaCard file={fakeLink().file} />
      </div>
    );
  }
}
