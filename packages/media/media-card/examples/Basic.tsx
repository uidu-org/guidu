import React, { PureComponent } from 'react';
import { fakeFile, fakeImage, fakeLink, fakeVideo } from '../example-helpers';
import MediaCard from '../src';

export default class Basic extends PureComponent {
  render() {
    return (
      <div className="card-columns">
        <div style={{ width: 320 }}>
          <MediaCard file={fakeImage().file} />
        </div>
        <div style={{ width: 320 }}>
          <MediaCard file={fakeVideo().file} />
        </div>
        <div style={{ width: 320 }}>
          <MediaCard file={fakeFile().file} />
        </div>
        <div style={{ width: 320 }}>
          <MediaCard file={fakeLink().file} />
        </div>
      </div>
    );
  }
}
