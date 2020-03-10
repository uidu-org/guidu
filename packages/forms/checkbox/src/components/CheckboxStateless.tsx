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
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

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
      className={`custom-control custom-checkbox${
        isInline ? ' custom-control-inline' : ''
      }`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        className="custom-control-input"
        onChange={onChange}
        value={id}
        disabled={disabled}
        checked={checked}
        ref={element}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
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
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'radioField',

      attributes: {
        componentName: 'fieldRadio',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'radioField',

      attributes: {
        componentName: 'fieldRadio',
        packageName,
        packageVersion,
      },
    }),
  })(CheckboxStateless),
);
