import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';
import { ReactSwitchProps } from 'react-switch';

export type FieldToggleStatelessProps = {
  id?: string;
  size?: 'xsmall' | 'small' | 'large';
} & ReactSwitchProps &
  WithAnalyticsEventsProps;

export type FieldToggleProps = {} & FieldBaseProps &
  Omit<FieldToggleStatelessProps, 'checked'>;
