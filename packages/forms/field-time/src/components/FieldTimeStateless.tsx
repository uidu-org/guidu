import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import { FieldTextStatelessWithoutAnalytics } from '@uidu/field-text';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import TimeField from 'react-simple-timefield';
import { FieldTimeProps } from '../types';
import pkg from '../version.json';

function FieldTime({
  className = 'form-control',
  forwardedRef,
  ...rest
}: FieldTimeProps) {
  const element = useRef(null);

  useImperativeHandle(forwardedRef, () => element.current);

  return (
    <TimeField
      {...rest}
      input={<FieldTextStatelessWithoutAnalytics ref={element} {...rest} />} // {Element}  default: <input type="text" />
      colon=":" // {String}   default: ":"
      // showSeconds // {Boolean}  default: false
    />
  );
}

const FieldTimeStateless = forwardRef((props: FieldTimeProps, ref) => (
  <FieldTime {...props} forwardedRef={ref} />
));

export { FieldTimeStateless as FieldTimeStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldNumber',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldNumber',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldNumber',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(FieldTimeStateless),
);
