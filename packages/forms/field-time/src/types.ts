import { FieldBaseProps, FieldBaseStatelessProps } from '@uidu/field-base';
import { HTMLProps } from 'react';

export type FieldTimeProps = {
  asSelect?: boolean;
  interval?: number;
  start?: number;
  end?: number;
} & FieldBaseProps<string>;

export type FieldTimeStatelessProps = FieldBaseStatelessProps &
  HTMLProps<HTMLInputElement>;
