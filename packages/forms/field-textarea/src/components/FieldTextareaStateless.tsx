import autosize from 'autosize';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { FieldTextareaStatelessProps } from '../types';

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
  }, [autoSize]);

  return (
    <textarea
      id={id}
      tw="background[rgb(var(--body-on-primary-bg))] shadow-sm focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] block w-full border border-color[rgb(var(--field-border, var(--border)))] rounded py-3 px-4 placeholder-gray-400 disabled:opacity-50 disabled:background[rgba(var(--brand-subtle), .4)]"
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

export default FieldTextareaStateless;
