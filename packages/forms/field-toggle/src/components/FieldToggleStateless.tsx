import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import Switch from 'react-switch';
import { FieldToggleStatelessProps } from '../types';
import pkg from '../version.json';

function FieldToggle({
  id,
  checked,
  onChange,
  size,
  onColor = '#28a745',
  offColor = '#ededed',
  forwardedRef,
}: FieldToggleStatelessProps & { forwardedRef?: any }) {
  const element = useRef(null);
  const sizes = useMemo(() => {
    switch (size) {
      case 'xsmall':
        return [16, 8];
      case 'small':
        return [24, 10];
      case 'large':
        return [46, 22];
      default:
        return [38, 18];
    }
  }, [size]);

  useImperativeHandle(forwardedRef, () => element.current.$inputRef);

  return (
    <Switch
      ref={element}
      id={id}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      onChange={onChange}
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      offColor={offColor}
      onColor={onColor}
      height={sizes[1]}
      width={sizes[0]}
    />
  );
}

const FieldToggleStateless = forwardRef(
  (props: FieldToggleStatelessProps, ref) => (
    <FieldToggle {...props} forwardedRef={ref} />
  ),
);

export { FieldToggleStateless as ToggleStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'toggle',
  packageName: pkg.name,
        packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'toggle',

      attributes: {
        componentName: 'toggle',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onChange: createAndFireEventOnGuidu({
      action: 'changed',
      actionSubject: 'toggle',

      attributes: {
        componentName: 'toggle',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'toggle',

      attributes: {
        componentName: 'toggle',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(FieldToggleStateless),
);
