import { companionUrl } from '@uidu/media-core';
import Uppy, { UppyOptions } from '@uppy/core';
import Dropbox from '@uppy/dropbox';
import GoogleDrive from '@uppy/google-drive';
import Instagram from '@uppy/instagram';
import { DashboardModal } from '@uppy/react';
import Unsplash from '@uppy/unsplash';
import Url from '@uppy/url';
import Webcam from '@uppy/webcam';
import React, { useEffect, useMemo, useState } from 'react';
import ReactFocusLock from 'react-focus-lock';
import { MediaPickerProps } from '../types';

const defaultOptions = {
  debug: false, // process.env.NODE_ENV === 'development',
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

  const [uppy] = useState(() =>
    new Uppy(mergeOptions)
      .use(Webcam)
      .use(uploadOptions.module, uploadOptions.options)
      .use(Url, {
        companionUrl,
      })
      .use(Instagram, { companionUrl })
      .use(Unsplash, { companionUrl })
      .use(GoogleDrive, {
        companionUrl,
      })
      .use(Dropbox, {
        companionUrl,
      }),
  );

  useEffect(() => {
    uppy
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
      .on('dashboard:modal-closed', onClose);
  }, [
    uppy,
    onFileAdded,
    onFileRemoved,
    onUploadError,
    onUploadProgress,
    onUploadSuccess,
    onUploadRetry,
    onComplete,
    onClose,
  ]);

  return (
    <ReactFocusLock>
      <DashboardModal
        uppy={uppy}
        plugins={[
          // 'XHRUpload',
          // 'Webcam',
          'Unsplash',
          'Url',
          'Dropbox',
          'GoogleDrive',
          // 'Instagram',
          // 'ThumbnailGenerator',
        ]}
        target={document.body}
        proudlyDisplayPoweredByUppy={false}
        // closeAfterFinish
        closeModalOnClickOutside
        disablePageScrollWhenModalOpen={false}
        open={open}
        {...props}
      />
    </ReactFocusLock>
  );
}
