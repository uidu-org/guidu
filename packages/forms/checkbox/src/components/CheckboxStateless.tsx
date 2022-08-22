import { FieldBaseStatelessProps } from '@uidu/field-base';
import React, { forwardRef, useEffect, useRef } from 'react';
import tw from 'twin.macro';
import { CheckboxStatelessProps } from '../types';

const CheckboxStateless = forwardRef<
  HTMLInputElement,
  CheckboxStatelessProps & FieldBaseStatelessProps
>(
  (
    {
      isIndeterminate,
      isInline,
      id,
      label,
      name,
      value,
      onChange,
      className,
      fieldState,
      disabled,
      checked,
    },
    ref,
  ) => {
    const element = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (element) {
        element.current.indeterminate = !!isIndeterminate;
      }
    }, [isIndeterminate]);

    return (
      <div
        css={[
          tw`relative items-start`,
          isInline ? tw`inline-flex` : tw`flex`,
          disabled ? tw`opacity-50` : tw`opacity-100`,
        ]}
      >
        <div tw="flex items-center h-5">
          <input
            aria-label={name}
            aria-checked={checked}
            aria-disabled={disabled}
            type="checkbox"
            className={className}
            css={[
              tw`focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] h-5 w-5 border-color[rgb(var(--checkbox-border, var(--border)))] rounded color[rgba(var(--brand-primary), 1)]`,
              fieldState?.error
                ? tw`border-red-300 focus:outline-none focus:ring-red-50 focus:border-red-400`
                : tw``,
            ]}
            id={id}
            name={name}
            value={value as string}
            onChange={onChange}
            disabled={disabled}
            checked={checked}
            ref={(e) => {
              ref(e);
              element.current = e;
            }}
          />
        </div>
        {label && (
          <div tw="ml-2">
            <label
              css={[
                tw`mb-0 select-none`,
                fieldState?.error ? tw`text-red-900` : tw``,
              ]}
              htmlFor={id}
            >
              {label}
            </label>
          </div>
        )}
      </div>
    );
  },
);

export default CheckboxStateless;
