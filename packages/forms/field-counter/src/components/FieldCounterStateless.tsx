import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import React, {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import NumericInput from 'react-numeric-input';
import { FieldCounterStatelessProps } from '../types';
import pkg from '../version.json';

function FieldCounter({
  className = 'form-control',
  onChange,
  placeholder,
  mobile = 'auto',
  forwardedRef,
  ...rest
}: FieldCounterStatelessProps) {
  const element: RefObject<NumericInput> = useRef();

  useImperativeHandle(forwardedRef, () => element.current.refsInput);

  return (
    <NumericInput
      {...rest}
      mobile={mobile}
      ref={element}
      tw="background[rgb(var(--body-on-primary-bg))] shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--border))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-subtle), .4)]"
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        'input.mobile': {
          paddingLeft: '2.5rem',
          paddingRight: '2.5rem',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        },
        btn: {
          position: 'absolute',
          right: 5,
          borderColor: 'rgba(0,0,0,.1)',
          borderStyle: 'solid',
          textAlign: 'center',
          cursor: 'default',
          transition: 'all 0.1s',
          background: '#fff',
          boxShadow: 'none',
          width: 20,
        },
        btnUp: {
          top: 4,
        },
        'btnUp.mobile': {
          width: '2rem',
          bottom: 0,
          top: 0,
          right: 0,
          boxShadow: 'none',
          borderRadius: 2,
          borderWidth: 1,
        },
        btnDown: {
          bottom: 4,
        },
        'btnDown.mobile': {
          width: '2rem',
          bottom: 0,
          top: 0,
          left: 0,
          boxShadow: 'none',
          borderRadius: 2,
          borderWidth: 1,
        },
      }}
    />
  );
}

const FieldCounterStateless = forwardRef(
  (props: FieldCounterStatelessProps, ref: any) => (
    <FieldCounter {...props} forwardedRef={ref} />
  ),
);

export { FieldCounterStateless as FieldNumberStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldNumeric',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'numericField',

      attributes: {
        componentName: 'fieldNumeric',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'numericField',

      attributes: {
        componentName: 'fieldNumeric',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(FieldCounterStateless),
);
