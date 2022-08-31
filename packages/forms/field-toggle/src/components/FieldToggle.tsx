import { SwitchProps } from '@radix-ui/react-switch';
import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import tw from 'twin.macro';
import { FieldToggleProps } from '../types';
import FieldToggleStateless from './FieldToggleStateless';

export default function FieldToggle({
  onChange = () => {},
  name,
  value: defaultValue = false,
  id,
  label,
  className,
  size,
  disabled,
  ...rest
}: FieldToggleProps) {
  const { field, wrapperProps, inputProps } = useController({
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange: SwitchProps['onCheckedChange'] = (value: boolean) => {
    field.onChange(value);
    onChange(name, value);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      return null;
    }
    e.preventDefault();
    field.onChange(!field.value);
    onChange(name, !field.value);
  };

  return (
    <Wrapper
      {...wrapperProps}
      label={null}
      floatLabel={false}
      errorIcon={({ fieldState }) => null}
    >
      <div
        css={[
          tw`relative flex items-center justify-between`,
          disabled ? tw`opacity-50` : tw`opacity-100`,
        ]}
        className={className}
      >
        <button type="button" onClick={handleClick} tw="inset-0 absolute" />
        {label && (
          <label htmlFor={id} tw="mb-0 mr-5">
            {label}
          </label>
        )}
        <FieldToggleStateless
          {...inputProps}
          id={id}
          size={size}
          checked={field.value}
          disabled={disabled}
          onChange={handleChange}
        />
      </div>
    </Wrapper>
  );
}
