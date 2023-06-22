import { noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import ReactSelect, { GroupBase } from 'react-select';
import { Country, groupedCountries } from './data/countries';
import { useSelect } from './hooks/useSelect';
import { CreateSelectProps, OptionProps, SingleValueProps } from './types';

const flagCSS = () => ({
  fontSize: '18px',
  marginRight: '8px',
});

function Option<TIsMulti extends boolean>(
  props: OptionProps<Country, TIsMulti, GroupBase<Country>>,
) {
  const { innerProps, data, getStyles } = props;
  return (
    <div
      {...innerProps}
      style={{
        ...getStyles('option', props),
      }}
    >
      <div tw="flex items-center mr-auto min-w-0 w-auto">
        <div tw="absolute w-5 h-5 flex items-center mr-2 text-lg">
          {data.before}
        </div>
        <div tw="min-w-0 flex-1 pl-8">
          <div tw="mb-0 truncate">{data.name}</div>
        </div>
      </div>
    </div>
  );
}

// return the country name; used for searching
const getOptionLabel = (opt: Country) => opt.name;

// set the country's abbreviation for the option value, (also searchable)
const getOptionValue = (opt: Country) => opt.id;

function SingleValue<TIsMulti extends boolean>(
  props: SingleValueProps<Country, TIsMulti, GroupBase<Country>>,
) {
  const { data, getStyles, innerProps } = props;
  return (
    <div
      {...innerProps}
      tw="flex items-center mr-auto"
      style={{
        ...getStyles('singleValue', props),
        // padding: '1rem',
        minWidth: 0,
        width: 'auto',
      }}
    >
      {data.before && (
        <div tw="absolute w-5 h-5 flex items-center mr-2 text-lg">
          {data.before}
        </div>
      )}
      <div tw="min-w-0 flex-1 pl-8">
        <div tw="truncate">{data.name}</div>
      </div>
    </div>
  );
}

// put it all together
function CountrySelect({
  name,
  onChange = noop,
  value: defaultValue = '',
  rules = {},
  ...rest
}: CreateSelectProps<Country>) {
  const { field, fieldState, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const handleChange = (value, option, actionMeta) => {
    field.onChange(option.id);
    onChange(name, option.id, { option, actionMeta });
  };

  const selectProps = useSelect<Country, false>({
    value: field.value,
    components: {
      Option,
      SingleValue,
    },
    options: groupedCountries,
    handleChange,
    styles: {
      container: (css) => ({ ...css }),
      dropdownIndicator: (css) => ({ ...css, paddingLeft: 0 }),
      menu: (css) => ({ ...css, width: 300 }),
    },
    isClearable: false,
    fieldState,
    ...rest,
  });

  return (
    <Wrapper {...wrapperProps}>
      <ReactSelect {...inputProps} {...selectProps} />
    </Wrapper>
  );
}

export default CountrySelect;
