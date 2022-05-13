import React, { forwardRef } from 'react';
import { FieldToggleProps } from '../types';
import FieldToggleStateless from './FieldToggleStateless';

function FieldToggle({
  onChange,
  onSetValue,
  name,
  value = false,
  id,
  label,
  className,
  forwardedRef,
  size,
  onColor,
  offColor,
}: FieldToggleProps) {
  const handleChange = (value) => {
    onSetValue(value);
    onChange(name, value);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onSetValue(!value);
    onChange(name, !value);
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
        id={id}
        size={size}
        onColor={onColor}
        offColor={offColor}
        checked={value}
        onChange={handleChange}
        ref={forwardedRef}
      />
    </div>
  );
}

export default forwardRef((props: FieldToggleProps, ref) => (
  <FieldToggle {...props} forwardedRef={ref} />
));
