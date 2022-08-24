import { FieldBaseProps } from '@uidu/field-base';
import { FileIdentifier, MediaUploadOptions } from '@uidu/media-core';
import { UppyOptions } from '@uppy/core';
import { FC } from 'react';
import { FileListProps } from './components/FileList';
import { PromptProps } from './components/Prompt';

export type FieldFileUploaderProps = {
  options?: Partial<UppyOptions>;
  uploadOptions: MediaUploadOptions;
  prompt?: FC<PromptProps>;
  fileList?: FC<FileListProps>;
} & FieldBaseProps<FileIdentifier | FileIdentifier[] | string>;
