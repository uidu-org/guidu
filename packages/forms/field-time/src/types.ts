import { FieldBaseProps, FieldBaseStatelessProps } from '@uidu/field-base';
import { HTMLProps } from 'react';

export type FieldTimeProps = {
  asSelect?: boolean;
} & FieldBaseProps;

export type FieldTimeStatelessProps = FieldBaseStatelessProps &
  HTMLProps<HTMLInputElement>;
