import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import { Wrapper } from '@uidu/field-base';
import { FieldTextStateless } from '@uidu/field-text';
import React, {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
} from 'react';
import { FieldPasswordStatelessProps } from '../types';
import pkg from '../version.json';

function FieldPassword({
  isPasswordVisible = false,
  forwardedRef,
  ...rest
}: FieldPasswordStatelessProps) {
  const element: RefObject<HTMLInputElement> = useRef();

  useImperativeHandle(forwardedRef, () => element.current);

  if (isPasswordVisible) {
    return (
      <Wrapper {...rest}>
        <FieldTextStateless {...rest} type="text" ref={element} />
      </Wrapper>
    );
  }
  return (
    <Wrapper {...rest}>
      <FieldTextStateless {...rest} type="password" ref={element} />
    </Wrapper>
  );
}

const FieldPasswordStateless = forwardRef(
  (props: FieldPasswordStatelessProps, ref) => (
    <FieldPassword {...props} forwardedRef={ref} />
  ),
);

export { FieldPasswordStateless as FieldPasswordStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldPassword',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldPassword',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'numberField',

      attributes: {
        componentName: 'fieldPassword',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(FieldPasswordStateless),
);
