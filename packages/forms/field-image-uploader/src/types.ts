import { FieldBaseProps } from '@uidu/field-base';
import { MediaUploadOptions } from '@uidu/media-core';

export type FieldImageUploaderProps = FieldBaseProps & {
  uploadOptions: MediaUploadOptions;
  toolbar?: React.FC<any>;
  existing?: React.FC<any>;
  empty?: React.FC<any>;
  prompt?: React.FC<any>;
  progress?: React.FC<any>;
  borderRadius?: number;
  max?: number;
  ratio: string;
  dropzoneProps?: any;

  defaultValue?: string;
};
