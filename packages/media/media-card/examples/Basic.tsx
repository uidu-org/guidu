import React, { PureComponent } from 'react';
import { fakeFile, fakeImage, fakeLink, fakeVideo } from '../example-helpers';
import MediaCard from '../src';

export default class Basic extends PureComponent {
  render() {
    return (
      <div className="card-columns">
        <MediaCard file={fakeImage().file} />
        <MediaCard file={fakeVideo().file} />
        <MediaCard file={fakeFile().file} />
        <MediaCard file={fakeLink().file} />
      </div>
    );
  }
}
