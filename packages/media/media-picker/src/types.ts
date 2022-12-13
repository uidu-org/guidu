import { UploadResult, UppyEventMap } from '@uppy/core';

import { MediaUploadOptions } from '@uidu/media-core';

export type MediaPickerProps = {
  onComplete: (result: UploadResult) => void;
  open?: boolean;
  uploadOptions: MediaUploadOptions;
  onFileAdded?: UppyEventMap['file-added'];
  onFileRemoved?: UppyEventMap['file-removed'];
  onUploadError?: UppyEventMap['upload-error'];
  onUploadProgress?: UppyEventMap['upload-progress'];
  onUploadSuccess?: UppyEventMap['upload-success'];
  onUploadRetry?: UppyEventMap['upload-retry'];
};

export type MediaFile = any;
