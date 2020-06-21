import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import { FieldTextStatelessWithoutAnalytics } from '@uidu/field-text';
import React, { forwardRef } from 'react';
import Input from 'react-phone-number-input/input';
import { FieldPhoneStatelessProps } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

function FieldPhone({
  id,
  className = 'form-control',
  value,
  forwardedRef,
  country = 'IT',
  onChange,
  ...rest
}: FieldPhoneStatelessProps) {
  return (
    <FieldTextStatelessWithoutAnalytics
      as={Input}
      options={{
        ref: forwardedRef,
        defaultCountry: country,
        value,
        onChange,
        className,
      }}
      {...rest}
    />
  );
}

const FieldPhoneStateless = forwardRef(
  (props: FieldPhoneStatelessProps, ref: any) => (
    <FieldPhone {...props} forwardedRef={ref} />
  ),
);

export { FieldPhoneStateless as FieldPhoneStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldDate',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'dateField',

      attributes: {
        componentName: 'fieldDate',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'dateField',

      attributes: {
        componentName: 'fieldDate',
        packageName,
        packageVersion,
      },
    }),
  })(FieldPhoneStateless),
);
