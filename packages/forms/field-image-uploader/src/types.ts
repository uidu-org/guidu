import { FieldBaseProps } from '@uidu/field-base';
import { MediaUploadOptions } from '@uidu/media-core';
import { FC } from 'react';

export type FieldImageUploaderProps = FieldBaseProps & {
  uploadOptions: MediaUploadOptions;
  toolbar?: FC<any>;
  existing?: FC<any>;
  empty?: FC<any>;
  prompt?: FC<any>;
  progress?: FC<any>;
  borderRadius?: number;
  max?: number;
  ratio: string;
  dropzoneProps?: any;
  defaultImageUrl?: string;
};
