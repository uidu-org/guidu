import { FieldBaseProps, FieldBaseStatelessProps } from '@uidu/field-base';
import { HTMLAttributes } from 'react';

export type FieldTextareaStatelessProps = FieldBaseStatelessProps &
  HTMLAttributes<HTMLTextAreaElement> & {
    autoSize?: boolean;
    rows?: number;
    cols?: number;
  };

export type FieldTextareaProps = {} & Omit<
  FieldTextareaStatelessProps,
  'onChange'
> &
  FieldBaseProps;
