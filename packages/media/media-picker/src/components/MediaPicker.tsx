import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import Dropbox from '@uppy/dropbox';
import GoogleDrive from '@uppy/google-drive';
import Url from '@uppy/url';
import '@uppy/url/dist/style.css';
import Webcam from '@uppy/webcam';
import '@uppy/webcam/dist/style.css';
import XHRUpload from '@uppy/xhr-upload';
import React, { Component } from 'react';

export default class MediaPicker extends Component<any> {
  constructor(props) {
    super(props);
    this.uppy = Uppy({
      restrictions: { maxNumberOfFiles: 1 },
      autoProceed: true,
    })
      .use(Webcam)
      .use(XHRUpload, {
        endpoint: 'http://my-website.org/upload',
      })
      .use(Url, {
        target: document.body,
        companionUrl: 'https://companion.uppy.io/',
      })
      .use(GoogleDrive, {
        target: document.body,
        companionUrl: 'https://companion.uppy.io/',
      })
      .use(Dropbox, {
        target: document.body,
        companionUrl: 'https://companion.uppy.io/',
      })
      .on('complete', result => {
        console.log(result);
      });
  }

  render() {
    return (
      <div>
        {/* <Dashboard uppy={this.uppy} plugins={['XHRUpload', 'Webcam', 'Url']} /> */}
      </div>
    );
  }
}
