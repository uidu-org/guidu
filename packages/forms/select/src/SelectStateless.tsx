import { FieldBaseStatelessProps } from '@uidu/field-base';
import React from 'react';
import ReactSelect, { GroupBase } from 'react-select';
import { useSelect } from './hooks/useSelect';
import { SelectStatelessProps } from './types';

export default function SelectStateless<
  TOption,
  TIsMulti extends boolean,
  TGroup extends GroupBase<TOption> = GroupBase<TOption>,
>({
  Component = ReactSelect,
  componentRef,
  options,
  onChange,
  ...rest
}: SelectStatelessProps<TOption> & FieldBaseStatelessProps) {
  const {
    getOptionLabel,
    getOptionValue,
    isDisabled,
    isMulti,
    components,
    getValue,
    styles,
  } = useSelect<TOption, TIsMulti, TGroup>({
    options,
    ...rest,
  });

  return (
    <Component
      {...rest}
      ref={componentRef}
      isMulti={isMulti}
      isDisabled={isDisabled}
      value={getValue()}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      components={components}
      styles={styles}
      // formatCreateLabel={(inputValue: string) => `Create new...${inputValue}`}
      // getNewOptionData={(inputValue, optionLabel) => ({
      //   id: inputValue,
      //   name: optionLabel,
      //   __isNew__: true,
      // })}
      onChange={onChange}
    />
  );
}
