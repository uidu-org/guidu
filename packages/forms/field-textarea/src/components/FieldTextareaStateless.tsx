import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import autosize from 'autosize';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { FieldTextareaStatelessProps } from '../types';
import pkg from '../version.json';

function FieldTextarea({
  id,
  className,
  autoSize = true,
  rows = 4,
  cols = 0,
  value,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  onKeyDown,
  onKeyUp,
  disabled,
  required,
  forwardedRef,
}: FieldTextareaStatelessProps) {
  const element = useRef(null);

  useImperativeHandle(forwardedRef, () => element.current);

  useEffect(() => {
    if (autoSize) {
      autosize(element.current);
    }
    return () => {
      autosize.destroy(element.current);
    };
  }, []);

  return (
    <textarea
      id={id}
      tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-color[rgb(var(--border))] rounded py-3 px-4 placeholder-gray-400"
      className={className}
      rows={rows}
      cols={cols}
      ref={element}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      defaultValue={value}
      disabled={disabled}
      required={required}
    />
  );
}

const FieldTextareaStateless = forwardRef(
  (props: FieldTextareaStatelessProps, ref) => (
    <FieldTextarea {...props} forwardedRef={ref} />
  ),
);

export { FieldTextareaStateless as FieldTextareaStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldTextarea',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'textareaField',

      attributes: {
        componentName: 'fieldTextarea',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'textareaField',

      attributes: {
        componentName: 'fieldTextarea',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(FieldTextareaStateless),
);
