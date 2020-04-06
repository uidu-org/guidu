import { FieldBaseProps } from '@uidu/field-base';
import { XHRUploadOptions } from '@uppy/xhr-upload';

export type FieldImageUploaderProps = FieldBaseProps & {
  XHRUploadOptions: Partial<XHRUploadOptions>;
  toolbar?: React.FC<any>;
  existing?: React.FC<any>;
  empty?: React.FC<any>;
  prompt?: React.FC<any>;
  borderRadius?: number;
  max?: number;
  ratio: string;
  dropzoneProps?: any;

  defaultValue?: string;
};
