import Tooltip from '@uidu/tooltip';
import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { useFormContext } from 'react-hook-form';
import { FieldPasswordProps } from '../types';
import FieldPasswordStateless from './FieldPasswordStateless';
import FieldPasswordStrength from './FieldPasswordStrength';

function FieldPassword({
  tooltipProps = {
    content: 'Show/Hide password',
  },
  measurePasswordStrength = true,
  instructions = 'Use at least 8 character. Password strength:',
  passwordStrengths = ['Worst', 'Bad', 'Weak', 'Good', 'Strong'],
  onSetValue,
  onChange,
  name,
  value,
  disabled,
  forwardedRef,
  ...rest
}: FieldPasswordProps) {
  const { control } = useFormContext<T>();
  // const {
  //   field: { onChange, onBlur, value, ref },
  //   fieldState: { invalid, isTouched, isDirty, error },
  //   formState: { touchedFields, dirtyFields },
  // } = useController<T>({
  //   name,
  //   control,
  //   defaultValue: defaultValue || '',
  // });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    onSetValue(value);
    onChange(name, value);
  };

  const handleVisiblity = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleFocus = () => {
    setShowInstructions(true);
  };

  return (
    <FieldPasswordStateless
      {...rest}
      disabled={disabled}
      ref={forwardedRef}
      name={name}
      value={value}
      isPasswordVisible={isPasswordVisible}
      onChange={handleChange}
      onFocus={handleFocus}
      //  ref={this.initElementRef}
      tw="pr-14"
      addonAfter={
        <Tooltip {...tooltipProps} className="input-group-append">
          <button
            tw="absolute right-0 inset-y-0 px-5 flex items-center"
            type="button"
            onClick={handleVisiblity}
            disabled={disabled}
          >
            {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </Tooltip>
      }
      help={
        measurePasswordStrength &&
        showInstructions && (
          <FieldPasswordStrength
            value={value}
            passwordStrengths={passwordStrengths}
            instructions={instructions}
          />
        )
      }
    />
  );
}

export default forwardRef((props: FieldPasswordProps, ref) => (
  <FieldPassword {...props} forwardedRef={ref} />
));
