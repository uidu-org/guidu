import { companionUrl } from '@uidu/media-core';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import Dropbox from '@uppy/dropbox';
import GoogleDrive from '@uppy/google-drive';
import { DashboardModal, useUppy } from '@uppy/react';
import Url from '@uppy/url';
import '@uppy/url/dist/style.css';
import Webcam from '@uppy/webcam';
import '@uppy/webcam/dist/style.css';
import React from 'react';
import { MediaPickerProps } from '../types';

const defaultOnComplete = () => {};

export default function MediaPicker({
  uploadOptions,
  onComplete = defaultOnComplete,
  open = false,
  onFileAdded = defaultOnComplete,
  onFileRemoved = defaultOnComplete,
  onUploadError = defaultOnComplete,
  onUploadProgress = defaultOnComplete,
  onUploadSuccess = defaultOnComplete,
  onUploadRetry = defaultOnComplete,
}: MediaPickerProps) {
  const uppy = useUppy(() =>
    new Uppy({
      debug: false,
      allowMultipleUploadBatches: true,
      restrictions: {
        maxNumberOfFiles: null,
        minNumberOfFiles: null,
        maxFileSize: null,
        allowedFileTypes: null,
      },
      autoProceed: true,
    })
      .use(Webcam)
      .use(uploadOptions.module, uploadOptions.options)
      .use(Url, {
        companionUrl,
      })
      .use(GoogleDrive, {
        companionUrl,
      })
      .use(Dropbox, {
        companionUrl,
      })
      .on('file-added', (file) => {
        uppy.setFileMeta(file.id, {
          size: file.size,
        });
        onFileAdded(file);
      })
      .on('file-removed', onFileRemoved)
      .on('upload-error', onUploadError)
      .on('upload-progress', onUploadProgress)
      .on('upload-success', onUploadSuccess)
      .on('upload-retry', onUploadRetry)
      .on('complete', onComplete),
  );

  return (
    <DashboardModal
      uppy={uppy}
      // plugins={[
      //   'XHRUpload',
      //   'Webcam',
      //   'Url',
      //   'Dropbox',
      //   'GoogleDrive',
      //   'ThumbnailGenerator',
      // ]}
      proudlyDisplayPoweredByUppy={false}
      // closeAfterFinish
      closeModalOnClickOutside
      open={open}
    />
  );
}
