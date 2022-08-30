import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import ReactSelectAsync from 'react-select/async';
import { useSelect } from './hooks/useSelect';
import { CreateSelectProps } from './types';

// put it all together
function AsyncSelect({
  name,
  onChange = () => {},
  value: defaultValue = '',
  rules,
  ...rest
}: CreateSelectProps<unknown>) {
  const { field, fieldState, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const handleChange = (value, option, actionMeta) => {
    field.onChange(value);
    onChange(name, value, { option, actionMeta });
  };

  const selectProps = useSelect<unknown, false>({
    value: field.value,
    handleChange,
    fieldState,
    formatCreateLabel: (inputValue) => `Create new...${inputValue}`,
    getNewOptionData: (inputValue, optionLabel) => ({
      id: inputValue,
      name: optionLabel,
      __isNew__: true,
    }),
    ...rest,
  });

  return (
    <Wrapper {...wrapperProps}>
      <ReactSelectAsync {...inputProps} {...selectProps} />
    </Wrapper>
  );
}

export default AsyncSelect;
