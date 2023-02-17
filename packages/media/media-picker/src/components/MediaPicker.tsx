import { companionUrl } from '@uidu/media-core';
import Uppy, { UppyOptions } from '@uppy/core';
import Dropbox from '@uppy/dropbox';
import GoogleDrive from '@uppy/google-drive';
import Instagram from '@uppy/instagram';
import { DashboardModal } from '@uppy/react';
import Unsplash from '@uppy/unsplash';
import Url from '@uppy/url';
import Webcam from '@uppy/webcam';
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

  const uppy = useMemo(() => {
    const uppyInstance = new Uppy(mergeOptions)
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
      });

    uppyInstance
      .on('file-added', (file) => {
        uppyInstance.setFileMeta(file.id, {
          size: file.size,
        });
        onFileAdded(file, uppyInstance);
      })
      .on('file-removed', (file, reason) =>
        onFileRemoved(file, reason, uppyInstance),
      )
      .on('upload-error', (file, error, response) =>
        onUploadError(file, error, response, uppyInstance),
      )
      .on('upload-progress', (file, progress) =>
        onUploadProgress(file, progress, uppyInstance),
      )
      .on('upload-success', (file, response) =>
        onUploadSuccess(file, response, uppyInstance),
      )
      .on('upload-retry', (fileId) => onUploadRetry(fileId, uppyInstance))
      .on('complete', (result) => onComplete(result, uppyInstance))
      .on('dashboard:modal-closed', onClose);
    return uppyInstance;
  }, [
    uploadOptions.module,
    uploadOptions.options,
    mergeOptions,
    onClose,
    onComplete,
    onFileAdded,
    onFileRemoved,
    onUploadError,
    onUploadProgress,
    onUploadRetry,
    onUploadSuccess,
  ]);

  return (
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
      proudlyDisplayPoweredByUppy={false}
      // closeAfterFinish
      closeModalOnClickOutside
      open={open}
      {...props}
    />
  );
}
