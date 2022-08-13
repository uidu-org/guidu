import { FieldBaseProps } from '@uidu/field-base';
import { ReactSwitchProps } from 'react-switch';

export type FieldToggleStatelessProps = {
  id?: string;
  size?: 'xsmall' | 'small' | 'large';
} & ReactSwitchProps;

export type FieldToggleProps = {} & FieldBaseProps &
  Omit<FieldToggleStatelessProps, 'checked'>;
