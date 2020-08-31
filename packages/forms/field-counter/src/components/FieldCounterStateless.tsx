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
          right: 4,
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
  packageName,
  packageVersion,
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
