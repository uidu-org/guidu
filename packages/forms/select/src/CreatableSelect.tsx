import { noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import ReactSelectCreatable from 'react-select/creatable';
import { useSelect } from './hooks/useSelect';
import { CreateSelectProps } from './types';

// put it all together
function CreatableSelect<TOption, TIsMulti extends boolean = false>({
  name,
  onChange = noop,
  value: defaultValue = '',
  rules,
  ...rest
}: CreateSelectProps<TOption, TIsMulti>) {
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

  const selectProps = useSelect<TOption, TIsMulti>({
    value: field.value,
    handleChange,
    fieldState,
    formatCreateLabel: (inputValue) => `Create nueva...${inputValue}`,
    getNewOptionData: (inputValue, optionLabel) => ({
      id: inputValue,
      name: optionLabel,
      __isNew__: true,
    }),
    ...rest,
  });

  return (
    <Wrapper {...wrapperProps}>
      <ReactSelectCreatable {...inputProps} {...selectProps} />
    </Wrapper>
  );
}

export default CreatableSelect;
