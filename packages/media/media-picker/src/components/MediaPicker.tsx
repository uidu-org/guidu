import { companionUrl } from '@uidu/media-core';
import Uppy, { UppyOptions } from '@uppy/core';
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
import React, { useMemo } from 'react';
import { MediaPickerProps } from '../types';

const defaultOptions = {
  debug: process.env.NODE_ENV === 'development',
  allowMultipleUploadBatches: true,
  restrictions: {
    maxNumberOfFiles: null,
    minNumberOfFiles: null,
    maxFileSize: null,
    allowedFileTypes: null,
  },
  autoProceed: true,
};

const defaultAdditionalOptions = {};
const defaultOnComplete = () => {};

export default function MediaPicker({
  uploadOptions,
  onComplete = defaultOnComplete,
  onClose = defaultOnComplete,
  options = defaultAdditionalOptions,
  open = false,
  onFileAdded = defaultOnComplete,
  onFileRemoved = defaultOnComplete,
  onUploadError = defaultOnComplete,
  onUploadProgress = defaultOnComplete,
  onUploadSuccess = defaultOnComplete,
  onUploadRetry = defaultOnComplete,
  ...props
}: MediaPickerProps) {
  const mergeOptions: UppyOptions = useMemo(
    () => ({
      ...defaultOptions,
      ...options,
    }),
    [options],
  );

  const uppy = useUppy(() =>
    new Uppy(mergeOptions)
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
        onFileAdded(file, uppy);
      })
      .on('file-removed', (file, reason) => onFileRemoved(file, reason, uppy))
      .on('upload-error', (file, error, response) =>
        onUploadError(file, error, response, uppy),
      )
      .on('upload-progress', (file, progress) =>
        onUploadProgress(file, progress, uppy),
      )
      .on('upload-success', (file, response) =>
        onUploadSuccess(file, response, uppy),
      )
      .on('upload-retry', (fileId) => onUploadRetry(fileId, uppy))
      .on('complete', (result) => onComplete(result, uppy))
      .on('dashboard:modal-closed', onClose),
  );

  return (
    <DashboardModal
      uppy={uppy}
      plugins={[
        // 'XHRUpload',
        // 'Webcam',
        'Url',
        'Dropbox',
        'GoogleDrive',
        // 'ThumbnailGenerator',
      ]}
      proudlyDisplayPoweredByUppy={false}
      // closeAfterFinish
      closeModalOnClickOutside
      open={open}
      {...props}
    />
  );
}
