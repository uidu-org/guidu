import { noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import ReactSelect, { GroupBase } from 'react-select';
import { useSelect } from './hooks/useSelect';
import { CreateSelectProps } from './types';

// put it all together
function Select<
  TOption = unknown,
  TIsMulti extends boolean = false,
  TGroup extends GroupBase<TOption> = GroupBase<TOption>,
>({
  name,
  onChange = noop,
  value: defaultValue = '',
  rules = {},
  ...rest
}: CreateSelectProps<TOption, TIsMulti, TGroup>) {
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

  const selectProps = useSelect<TOption, TIsMulti, TGroup>({
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
