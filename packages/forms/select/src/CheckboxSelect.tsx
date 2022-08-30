import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import ReactSelect from 'react-select';
import { CheckboxOption } from './components/input-options';
import { useSelect } from './hooks/useSelect';
import { CreateSelectProps } from './types';

// put it all together
function CheckboxSelect({
  name,
  onChange = () => {},
  value: defaultValue = '',
  rules,
  ...rest
}: CreateSelectProps<unknown, true>) {
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

  const selectProps = useSelect<unknown, true>({
    value: field.value,
    handleChange,
    fieldState,
    closeMenuOnSelect: false,
    hideSelectedOptions: false,
    components: {
      Option: CheckboxOption,
    },
    multiple: true,
    ...rest,
  });

  return (
    <Wrapper {...wrapperProps}>
      <ReactSelect {...inputProps} {...selectProps} />
    </Wrapper>
  );
}

export default CheckboxSelect;
