import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';
import { HTMLProps, RefObject } from 'react';

export type FieldTimeProps = FieldBaseProps & WithAnalyticsEventsProps;

export type FieldTimeStatelessProps = HTMLProps<HTMLInputElement> & {
  forwardedRef: RefObject<HTMLInputElement>;
};
