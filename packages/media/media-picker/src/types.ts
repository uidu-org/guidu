import type Uppy from '@uppy/core';
import {
  ErrorResponse,
  FileProgress,
  FileRemoveReason,
  SuccessResponse,
  UploadResult,
  UppyFile,
  UppyOptions,
} from '@uppy/core';

import { MediaUploadOptions } from '@uidu/media-core';

export type MediaPickerProps = {
  open?: boolean;
  options?: Partial<UppyOptions>;
  uploadOptions: MediaUploadOptions;
  onClose?: () => void;
  onComplete: (result: UploadResult, uppy: Uppy) => void;
  onFileAdded?: (file: UppyFile, uppy: Uppy) => void;
  onFileRemoved?: (
    file: UppyFile,
    reason: FileRemoveReason,
    uppy: Uppy,
  ) => void;
  onUploadError?: (
    file: UppyFile,
    error: Error,
    response: ErrorResponse,
    uppy: Uppy,
  ) => void;
  onUploadProgress?: (
    file: UppyFile,
    progress: FileProgress,
    uppy: Uppy,
  ) => void;
  onUploadSuccess?: (
    file: UppyFile,
    response: SuccessResponse,
    uppy: Uppy,
  ) => void;
  onUploadRetry?: (fileId: string, uppy: Uppy) => void;
};

export type MediaFile = any;
