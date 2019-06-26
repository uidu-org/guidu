import { companionUrl } from '@uidu/media-core';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import Dropbox from '@uppy/dropbox';
import GoogleDrive from '@uppy/google-drive';
import { DashboardModal } from '@uppy/react';
import Url from '@uppy/url';
import '@uppy/url/dist/style.css';
import Webcam from '@uppy/webcam';
import '@uppy/webcam/dist/style.css';
import XHRUpload from '@uppy/xhr-upload';
import React, { Component } from 'react';

export default class MediaPicker extends Component<any> {
  static defaultProps = {
    onComplete: console.log,
  };

  private uppy;

  constructor(props) {
    super(props);
    const { onComplete } = props;
    this.uppy = Uppy({
      debug: true,
      allowMultipleUploads: true,
      restrictions: {
        maxNumberOfFiles: null,
        minNumberOfFiles: null,
        maxFileSize: null,
        allowedFileTypes: null,
      },
      autoProceed: true,
    });
    this.uppy
      .use(Webcam)
      .use(XHRUpload, {
        formData: true,
        endpoint:
          'https://uidufundraising.uidu.local:8443/rails/active_storage/direct_uploads',
        withCredentials: true,
      })
      .use(Url, {
        companionUrl,
      })
      .use(GoogleDrive, {
        companionUrl,
      })
      .use(Dropbox, {
        companionUrl,
      });
    this.uppy.on('file-added', file => {
      this.uppy.setFileMeta(file.id, {
        size: file.size,
      });
    });
    this.uppy.on('complete', result => {
      onComplete(result);
    });
  }

  render() {
    return (
      <DashboardModal
        uppy={this.uppy}
        plugins={['XHRUpload', 'Webcam', 'Url', 'Dropbox', 'GoogleDrive']}
        proudlyDisplayPoweredByUppy={false}
        {...this.props}
      />
    );
  }
}
