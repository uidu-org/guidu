import { FieldBaseStatelessProps } from '@uidu/field-base';
import React, { useMemo } from 'react';
import ReactSelect, {
  mergeStyles,
  Options,
  OptionsOrGroups,
} from 'react-select';
import * as defaultComponents from './components';
import MultiValueLabel from './components/MultiValueLabel';
import Option from './components/Option';
import SingleValue from './components/SingleValue';
import baseStyles from './styles';
import { SelectStatelessProps } from './types';

export default function SelectStateless<
  TOption = { name: string; id: string },
  TIsMulti = true,
>({
  Component = ReactSelect,
  fieldState,
  isCompact,
  value,
  getOptionLabel = ({ name }) => name,
  getOptionValue = ({ id }) => id,
  options,
  multiple,
  disabled,
  styles,
  components = {
    Option,
    SingleValue,
    MultiValueLabel,
  },
  onChange,
  ...rest
}: SelectStatelessProps<TOption> & FieldBaseStatelessProps) {
  const flatten = (arr: OptionsOrGroups<TOption, any>): Options<TOption> =>
    arr.reduce(
      (acc, val) =>
        Array.isArray(val.options)
          ? acc.concat(flatten(val.options))
          : acc.concat(val),
      [],
    );

  const getValue = () => {
    if (value === undefined) return undefined;

    const opts = flatten(options);
    const cleanedValue = multiple
      ? opts.filter((o) => value.includes(getOptionValue(o)))
      : opts.find((o) => getOptionValue(o) === value);

    return cleanedValue;
  };

  const makeComponents = useMemo(
    () => ({
      ...defaultComponents,
      ...components,
    }),
    [components],
  );

  return (
    <Component
      {...rest}
      isMulti={multiple}
      value={getValue()}
      options={options}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      formatCreateLabel={(inputValue: string) => `Create new...${inputValue}`}
      isDisabled={!!disabled}
      getNewOptionData={(inputValue, optionLabel) => ({
        id: inputValue,
        name: optionLabel,
        __isNew__: true,
      })}
      components={makeComponents}
      styles={mergeStyles(baseStyles(fieldState, isCompact), styles)}
      onChange={onChange}
    />
  );
}
