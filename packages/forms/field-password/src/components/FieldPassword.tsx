import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { StyledAddon, useController, Wrapper } from '@uidu/field-base';
import { useFormContext } from '@uidu/form';
import Tooltip from '@uidu/tooltip';
import React, { ChangeEvent, useState } from 'react';
import { FieldPasswordProps } from '../types';
import FieldPasswordStateless from './FieldPasswordStateless';
import FieldPasswordStrength from './FieldPasswordStrength';

export default function FieldPassword({
  tooltipProps = {
    content: 'Show/Hide password',
  },
  measurePasswordStrength = true,
  instructions = 'Use at least 8 character. Password strength:',
  passwordStrengths = ['Worst', 'Bad', 'Weak', 'Good', 'Strong'],
  onChange = () => {},
  name,
  value: defaultValue = '',
  disabled,
  ...rest
}: FieldPasswordProps) {
  const { control } = useFormContext();
  const { field, wrapperProps, inputProps } = useController({
    name,
    control,
    defaultValue,
    onChange,
    ...rest,
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    field.onChange(value);
    onChange(field.name, value);
  };

  const handleVisiblity = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setShowInstructions(true);
  };

  return (
    <Wrapper
      {...wrapperProps}
      addonsAfter={[
        <StyledAddon>
          <Tooltip {...tooltipProps} tw="w-full h-full">
            <button
              tw="h-full w-full px-4"
              type="button"
              onClick={handleVisiblity}
              disabled={disabled}
            >
              {isPasswordVisible ? (
                <EyeOffIcon tw="h-5 w-5" />
              ) : (
                <EyeIcon tw="h-5 w-5" />
              )}
            </button>
          </Tooltip>
        </StyledAddon>,
      ]}
      help={
        measurePasswordStrength &&
        showInstructions && (
          <FieldPasswordStrength
            value={field.value}
            passwordStrengths={passwordStrengths}
            instructions={instructions}
          />
        )
      }
    >
      <FieldPasswordStateless
        {...rest}
        {...inputProps}
        disabled={disabled}
        isPasswordVisible={isPasswordVisible}
        onChange={handleChange}
        onFocus={handleFocus}
        tw="pr-14"
      />
    </Wrapper>
  );
}
