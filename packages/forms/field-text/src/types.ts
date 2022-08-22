import { FieldBaseProps } from '@uidu/field-base';
import { HTMLAttributes } from 'react';

export type FieldTextStatelessProps = HTMLAttributes<HTMLInputElement> & {
  inputMode?: string;
  type?: string;
  autoComplete?: string;
};

export type FieldTextProps<T> = FieldBaseProps<T> & FieldTextStatelessProps;
