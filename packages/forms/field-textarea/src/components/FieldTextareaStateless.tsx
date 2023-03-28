import { FieldBaseStatelessProps, StyledInput } from '@uidu/field-base';
import UiduSpinner from '@uidu/spinner';
import autosize from 'autosize';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
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
    const [isAutosizing, setIsAutosizing] = useState(true);

    useEffect(() => {
      element.current.addEventListener('autosize:resized', () => {
        setIsAutosizing(false);
      });
      setTimeout(() => {
        if (autoSize && element.current) {
          autosize(element.current);
        }
      }, 300);
      return () => {
        autosize.destroy(element.current);
      };
    }, [autoSize]);

    return (
      <div tw="relative">
        {isAutosizing && autoSize && (
          <div tw="bg-white absolute inset-px rounded flex items-center justify-center">
            <UiduSpinner size="small" />
          </div>
        )}
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
      </div>
    );
  },
);

export default FieldTextareaStateless;
