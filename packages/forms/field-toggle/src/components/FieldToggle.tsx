import { useController } from '@uidu/field-base';
import { useFormContext } from '@uidu/form';
import React from 'react';
import { FieldToggleProps } from '../types';
import FieldToggleStateless from './FieldToggleStateless';

export default function FieldToggle({
  onChange,
  name,
  value: defaultValue = false,
  id,
  label,
  className,
  size,
  onColor,
  offColor,
}: FieldToggleProps) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name,
    defaultValue,
    onChange,
    ...rest,
  });

  const handleChange = (value) => {
    field.onChange(value);
    onChange(name, value);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    field.onChange(!field.value);
    onChange(name, !field.value);
  };

  return (
    <div tw="flex items-center justify-between relative" className={className}>
      <button type="button" onClick={handleClick} tw="inset-0 absolute" />
      {label && (
        <label htmlFor={id} tw="mb-0 mr-5">
          {label}
        </label>
      )}
      <FieldToggleStateless
        {...field}
        id={id}
        size={size}
        onColor={onColor}
        offColor={offColor}
        checked={field.value}
        onChange={handleChange}
      />
    </div>
  );
}
