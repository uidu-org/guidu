import { StyledInput } from '@uidu/field-base';
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
  fieldState,
  ...rest
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
    <StyledInput
      as="textarea"
      id={id}
      hasError={!!fieldState?.error}
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
      {...rest}
    />
  );
}

const FieldTextareaStateless = forwardRef(
  (props: FieldTextareaStatelessProps, ref) => (
    <FieldTextarea {...props} forwardedRef={ref} />
  ),
);

export default FieldTextareaStateless;
