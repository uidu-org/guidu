import { FieldBaseProps } from '@uidu/field-base';
import { FileIdentifier, MediaUploadOptions } from '@uidu/media-core';
import { UppyEventMap, UppyOptions } from '@uppy/core';
import { FC } from 'react';
import { FileListProps } from './components/FileList';
import { PromptProps } from './components/Prompt';

export type FieldFileUploaderProps = {
  options?: Partial<UppyOptions>;
  uploadOptions: MediaUploadOptions;
  prompt?: FC<PromptProps>;
  fileList?: FC<FileListProps>;
  onFileAdded?: UppyEventMap['file-added'];
  onFileRemoved?: UppyEventMap['file-removed'];
  onUploadComplete?: UppyEventMap['complete'];
  onUploadError?: UppyEventMap['upload-error'];
  onUploadProgress?: UppyEventMap['upload-progress'];
  onUploadSuccess?: UppyEventMap['upload-success'];
  onUploadRetry?: UppyEventMap['upload-retry'];
} & FieldBaseProps<FileIdentifier | FileIdentifier[] | string>;
