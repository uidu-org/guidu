import { FieldBaseProps } from '@uidu/field-base';

export type FieldImageUploaderProps = FieldBaseProps & {
  toBase64?: boolean;
  toolbar?: React.FC<any>;
  existing?: React.FC<any>;
  empty?: React.FC<any>;
  borderRadius?: number;
  max?: number;
  ratio: string;
  dropzoneProps?: any;

  defaultValue?: string;
};
