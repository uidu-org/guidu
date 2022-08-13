import React from 'react';
import tw from 'twin.macro';
import { RadioStatelessProps } from '../types';

function RadioStateless({
  value,
  label,
  id,
  name,
  onChange,
  disabled,
  defaultChecked,
  isInline,
  className,
}: RadioStatelessProps) {
  return (
    <div
      css={[tw`relative items-start`, isInline ? tw`inline-flex` : tw`flex`]}
    >
      <div tw="flex items-center h-5">
        <input
          type="radio"
          id={id}
          name={name}
          className={className}
          tw="focus:--tw-ring-color[rgba(var(--brand-primary), .5)] h-5 w-5 border-color[rgb(var(--radio-border, var(--border)))] color[rgba(var(--brand-primary), 1)]"
          onChange={onChange}
          value={value}
          disabled={disabled}
          defaultChecked={defaultChecked}
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

export default RadioStateless;
