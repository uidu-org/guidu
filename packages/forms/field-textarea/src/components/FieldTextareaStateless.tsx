import { FieldBaseStatelessProps, StyledInput } from '@uidu/field-base';
import autosize from 'autosize';
import React, { forwardRef, useEffect, useRef } from 'react';
import { FieldTextareaStatelessProps } from '../types';

const FieldTextareaStateless = forwardRef<
  HTMLTextAreaElement,
  FieldTextareaStatelessProps & FieldBaseStatelessProps
>(
  (
    {
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
      fieldState,
      ...rest
    },
    ref,
  ) => {
    const element = useRef<HTMLTextAreaElement>(null);

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
        $hasError={!!fieldState?.error}
        as="textarea"
        id={id}
        className={className}
        rows={rows}
        cols={cols}
        ref={(e) => {
          if (ref && typeof ref === 'function') ref(e);
          element.current = e;
        }}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        value={value}
        disabled={disabled}
        required={required}
        {...rest}
      />
    );
  },
);

export default FieldTextareaStateless;
