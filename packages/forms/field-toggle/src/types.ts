import { SwitchProps } from '@radix-ui/react-switch';
import { FieldBaseProps } from '@uidu/field-base';

export type FieldToggleStatelessProps = SwitchProps & {
  size?: 'xsmall' | 'small' | 'large';
};

export type FieldToggleProps = FieldBaseProps<boolean> &
  Omit<FieldToggleStatelessProps, 'checked'>;
