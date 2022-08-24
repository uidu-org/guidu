import { FieldBaseStatelessProps } from '@uidu/field-base';
import React, { forwardRef } from 'react';
import tw from 'twin.macro';
import { RadioStatelessProps } from '../types';

const RadioStateless = forwardRef<
  HTMLInputElement,
  RadioStatelessProps & FieldBaseStatelessProps
>(
  (
    {
      id,
      value,
      label,
      name,
      onChange,
      checked,
      disabled,
      defaultChecked,
      isInline,
      className,
      fieldState,
      ...rest
    },
    ref,
  ) => (
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
          ref={ref}
          type="radio"
          id={id}
          name={name}
          value={value as string}
          className={className}
          css={[
            tw`focus:--tw-ring-color[rgba(var(--brand-primary), .1)] focus:ring-2 focus:border-color[rgb(var(--brand-primary))] h-5 w-5 border-color[rgb(var(--radio-border, var(--border)))] rounded-full color[rgba(var(--brand-primary), 1)]`,
            fieldState?.error
              ? tw`border-red-300 focus:outline-none focus:ring-red-50 focus:border-red-400`
              : tw``,
          ]}
          onChange={onChange}
          disabled={disabled}
          defaultChecked={defaultChecked}
          {...rest}
        />
      </div>
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
    </div>
  ),
);

export default RadioStateless;
