import { noop, useController, Wrapper } from '@uidu/field-base';
import React from 'react';
import ReactSelect from 'react-select';
import TimeZone from 'timezones-list';
import Option from './components/Option';
import timezones from './data/timezones';
import { useSelect } from './hooks/useSelect';
import { CreateSelectProps } from './types';

// return the country name; used for searching
const getOptionLabel = (opt: (typeof TimeZone)[number]) => opt.label;

// set the country's abbreviation for the option value, (also searchable)
const getOptionValue = (opt: (typeof TimeZone)[number]) => opt.tzCode;

function SingleValue({ innerProps, data, getStyles, ...otherProps }) {
  return (
    <div
      {...innerProps}
      tw="flex items-center mr-auto"
      style={{
        ...getStyles('singleValue', otherProps),
        // padding: '1rem',
        minWidth: 0,
        width: 'auto',
      }}
    >
      {data.before && (
        <div tw="mr-2 flex-shrink-0 flex" style={{ width: 22 }}>
          {data.before}
        </div>
      )}
      {data.label}
    </div>
  );
}

// put it all together
function TimeZoneSelect({
  name,
  onChange = noop,
  value: defaultValue = '',
  rules = {},
  components: propComponents = {},
  ...rest
}: CreateSelectProps<(typeof TimeZone)[number]>) {
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

  const selectProps = useSelect<(typeof TimeZone)[number], false>({
    value: field.value,
    handleChange,
    fieldState,
    isClearable: false,
    getOptionLabel,
    getOptionValue,
    options: timezones,
    styles: {
      container: (css) => ({ ...css }),
      dropdownIndicator: (css) => ({ ...css, paddingLeft: 0 }),
      menu: (css) => ({ ...css, width: 300 }),
    },
    components: {
      ...propComponents,
      Option,
      SingleValue,
    },
  });

  return (
    <Wrapper {...wrapperProps}>
      <ReactSelect {...inputProps} {...selectProps} />
    </Wrapper>
  );
}

export default TimeZoneSelect;
