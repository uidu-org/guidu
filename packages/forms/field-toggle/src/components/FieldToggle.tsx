import React, { forwardRef } from 'react';
import StyledWrapper from '../styled';
import { FieldToggleProps } from '../types';
import FieldToggleStateless from './FieldToggleStateless';

function FieldToggle({
  onChange,
  onSetValue,
  name,
  value = false,
  id,
  label,
  className = 'list-group-item list-group-action',
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
    <StyledWrapper className={className} onClick={handleClick}>
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
    </StyledWrapper>
  );
}

export default forwardRef((props: FieldToggleProps, ref) => (
  <FieldToggle {...props} forwardedRef={ref} />
));
