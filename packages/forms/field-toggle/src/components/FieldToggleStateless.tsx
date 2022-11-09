import { Root, Switch, Thumb } from '@radix-ui/react-switch';
import { FieldBaseStatelessProps } from '@uidu/field-base';
import React, { forwardRef, useMemo } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { FieldToggleStatelessProps } from '../types';

const StyledSwitchRoot = styled(Root)<{ $hasError: boolean }>`
  ${tw`bg-gray-200 flex items-center flex items-center transition-all duration-200 rounded-3xl focus:[--tw-ring-color:rgba(var(--brand-primary), .1)] focus:ring-2 focus:[border-color:rgb(var(--brand-primary))]`}
  ${({ $hasError }) =>
    $hasError &&
    tw`bg-red-400 border-red-500 focus:outline-none focus:ring-red-50 focus:border-red-400`}
  &[data-state='checked'] {
    ${tw`bg-green-400`}
  }
`;
const StyledSwitchThumb = styled(Thumb)<{ $size: number }>`
  ${tw`block transition-all duration-200 ease-in-out`}
  ${({ $size }) =>
    css`
      width: ${$size}px;
      height: ${$size}px;
    `}
  &[data-state='checked'] {
    transform: ${({ $size }) => `translateX(${$size}px)`};
  }
`;

const FieldToggleStateless = forwardRef<
  typeof Switch,
  FieldToggleStatelessProps & FieldBaseStatelessProps
>(({ id, checked, onChange, size, disabled, fieldState, ...rest }, ref) => {
  const sizes = useMemo(() => {
    switch (size) {
      case 'xsmall':
        return [16, 8];
      case 'small':
        return [24, 10];
      case 'large':
        return [46, 22];
      default:
        return [42, 21];
    }
  }, [size]);

  return (
    <StyledSwitchRoot
      $hasError={!!fieldState?.error}
      checked={checked}
      style={{ width: sizes[0], height: sizes[1] }}
      ref={ref}
      onCheckedChange={onChange}
      disabled={disabled}
      {...rest}
    >
      <StyledSwitchThumb
        tw="bg-white border border-gray-300 rounded-full shadow-lg"
        $size={sizes[0] / 2}
      />
    </StyledSwitchRoot>
  );
});

export default FieldToggleStateless;
