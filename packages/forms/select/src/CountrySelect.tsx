import React from 'react';
import { CreateSelectProps } from './createSelect';
// import Option from './components/Option';
import { groupedCountries } from './data/countries';
import Select from './Select';

const flagCSS = () => ({
  fontSize: '18px',
  marginRight: '8px',
});

function Option({ innerProps, data, getStyles, ...otherProps }) {
  return (
    <div
      {...innerProps}
      style={{
        ...getStyles('option', otherProps),
      }}
    >
      <div tw="flex items-center mr-auto min-w-0 w-auto">
        <div tw="absolute w-5 h-5 flex items-center" style={flagCSS()}>
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
const getOptionLabel = (opt: any) => opt.name;

// set the country's abbreviation for the option value, (also searchable)
const getOptionValue = (opt: any) => opt.id;

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
        <div tw="absolute w-5 h-5 flex items-center" style={flagCSS()}>
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
function CountrySelect({ components, ...otherProps }: CreateSelectProps) {
  return (
    // @ts-ignore
    <Select
      {...otherProps}
      isClearable={false}
      // formatOptionLabel={formatOptionLabel}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      // isMulti={false}
      options={groupedCountries}
      styles={{
        container: (css) => ({ ...css }),
        dropdownIndicator: (css) => ({ ...css, paddingLeft: 0 }),
        menu: (css) => ({ ...css, width: 300 }),
      }}
      components={{
        ...components,
        Option,
        SingleValue: SingleValue,
      }}
    />
  );
}

export default CountrySelect;
