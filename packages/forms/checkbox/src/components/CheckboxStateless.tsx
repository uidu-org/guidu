import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import React, {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import tw from 'twin.macro';
import pkg from '../version.json';

type CheckboxStatelessProps = {
  label?: string | React.ReactNode;
  id?: string;
  name?: string;
  disabled?: boolean;
  isIndeterminate?: boolean;
  onChange?: (e) => void;
  checked?: boolean;
  isInline?: boolean;
  forwardedRef?: any;
};

function Checkbox({
  isIndeterminate,
  label,
  id,
  name,
  onChange,
  disabled,
  checked,
  isInline,
  forwardedRef,
  className,
}: CheckboxStatelessProps) {
  const element: RefObject<HTMLInputElement> = useRef();

  useImperativeHandle(forwardedRef, () => element.current);

  useEffect(() => {
    if (element) {
      element.current.indeterminate = !!isIndeterminate;
    }
    return () => null;
  }, [isIndeterminate]);

  return (
    <div
      css={[tw`relative items-start`, isInline ? tw`inline-flex` : tw`flex`]}
    >
      <div tw="flex items-center h-5">
        <input
          type="checkbox"
          className={className}
          tw="focus:ring-indigo-500 h-5 w-5 border-gray-300 rounded color[rgba(var(--primary), 1)]"
          id={id}
          name={name}
          onChange={onChange}
          value={id}
          disabled={disabled}
          checked={checked}
          ref={element}
        />
      </div>
      <div tw="ml-2">
        <label tw="mb-0" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}

const CheckboxStateless = forwardRef(
  (props: CheckboxStatelessProps, ref: any) => (
    <Checkbox {...props} forwardedRef={ref} />
  ),
);

export { CheckboxStateless as CheckboxStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldRadio',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'radioField',

      attributes: {
        componentName: 'fieldRadio',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'radioField',

      attributes: {
        componentName: 'fieldRadio',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(CheckboxStateless),
);
