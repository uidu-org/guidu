import { companionUrl, MediaUploadOptions } from '@uidu/media-core';
import Uppy, { UploadResult } from '@uppy/core';
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

const defaultOnComplete = () => {};

export default function MediaPicker({
  uploadOptions,
  onComplete = defaultOnComplete,
  open = false,
}: {
  onComplete: (result: UploadResult) => void;
  open: boolean;
  uploadOptions: MediaUploadOptions;
}) {
  const uppy = useUppy(() =>
    new Uppy({
      debug: true,
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
      })
      .on('complete', (result) => {
        onComplete(result);
      }),
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
