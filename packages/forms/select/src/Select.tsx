import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import ReactSelect from 'react-select';
import { useSelect } from './hooks/useSelect';
import { CreateSelectProps } from './types';

// put it all together
function Select({
  name,
  onChange,
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
    ...rest,
  });

  return (
    <Wrapper {...wrapperProps}>
      <ReactSelect {...inputProps} {...selectProps} />
    </Wrapper>
  );
}

export default Select;
