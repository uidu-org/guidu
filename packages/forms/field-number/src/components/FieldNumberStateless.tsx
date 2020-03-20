import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import { FieldTextStatelessWithoutAnalytics } from '@uidu/field-text';
import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import { FieldNumberStatelessProps } from '../types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

function FieldNumber({
  options,
  onValueChange,
  forwardedRef,
  value,
  ...rest
}: FieldNumberStatelessProps) {
  return (
    <FieldTextStatelessWithoutAnalytics
      inputMode="numeric"
      as={NumberFormat}
      options={{
        thousandSeparator: '.',
        decimalSeparator: ',',
        isNumericString: true,
        decimalScale: 2,
        onValueChange,
        getInputRef: forwardedRef,
        value, // check https://github.com/s-yadav/react-number-format/issues/283
        ...options,
      }}
      {...rest}
    />
  );
}

const FieldNumberStateless = forwardRef(
  (props: FieldNumberStatelessProps, ref) => (
    <FieldNumber {...props} forwardedRef={ref} />
  ),
);

export { FieldNumberStateless as FieldNumberStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldNumber',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldNumber',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldNumber',
        packageName,
        packageVersion,
      },
    }),
  })(FieldNumberStateless),
);
