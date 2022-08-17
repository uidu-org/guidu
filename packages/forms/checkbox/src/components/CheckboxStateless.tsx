import React, {
  forwardRef,
  RefObject,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
} from 'react';
import tw from 'twin.macro';

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
  name,
  onChange,
  disabled,
  checked,
  isInline,
  forwardedRef,
  className,
}: CheckboxStatelessProps) {
  const id = useId();

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
          tw="focus:--tw-ring-color[rgba(var(--brand-primary), .5)] h-5 w-5 border-color[rgb(var(--checkbox-border, var(--border)))] rounded color[rgba(var(--brand-primary), 1)]"
          id={id}
          name={name}
          onChange={onChange}
          value={name}
          disabled={disabled}
          checked={checked}
          ref={element}
        />
      </div>
      {label && (
        <div tw="ml-2">
          <label tw="mb-0" htmlFor={id}>
            {label}
          </label>
        </div>
      )}
    </div>
  );
}

const CheckboxStateless = forwardRef(
  (props: CheckboxStatelessProps, ref: any) => (
    <Checkbox {...props} forwardedRef={ref} />
  ),
);

export default CheckboxStateless;
