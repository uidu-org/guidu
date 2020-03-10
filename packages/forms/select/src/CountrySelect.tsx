import React from 'react';
import { groupedCountries } from './data/countries';
import Select from './Select';

// flow stuff
type OptionType = { id: string; code: number; icon: string; name: string };

// custom option renderer
const labelCSS = () => ({
  alignItems: 'center',
  display: 'flex',
  lineHeight: 1.2,
});

const flagCSS = () => ({
  fontSize: '18px',
  marginRight: '8px',
});

const Opt = ({ children, icon }: any) => (
  <div style={labelCSS()}>
    <span style={flagCSS()}>{icon}</span>
    {children}
  </div>
);

// return the country name; used for searching
const getOptionLabel = (opt: OptionType) => opt.name;

// set the country's abbreviation for the option value, (also searchable)
const getOptionValue = (opt: OptionType) => opt.id;

// the text node of the control
const controlLabel = (opt: OptionType) => (
  <Opt icon={opt.icon}>{opt.id.toUpperCase()}</Opt>
);
// the text node for an option
const optionLabel = ({ id, code, icon, name }: OptionType) => (
  <Opt icon={icon}>
    {name} ({id.toUpperCase()}) +{code}
  </Opt>
);

// switch formatters based on render context (menu | value)
const formatOptionLabel = (opt: OptionType, { context }): any =>
  context === 'value' ? controlLabel(opt) : optionLabel(opt);

const SingleValue = ({ innerProps, data, getStyles, ...otherProps }) => {
  return (
    <div
      {...innerProps}
      className="d-flex align-items-center mr-auto"
      style={{
        ...getStyles('singleValue', otherProps),
        // padding: '1rem',
        minWidth: 0,
        width: 'auto',
      }}
    >
      {data.before && (
        <div className="mr-2 flex-shrink-0 d-flex" style={{ width: 22 }}>
          {data.before}
        </div>
      )}
    </div>
  );
};

// put it all together
const CountrySelect = ({ components, ...otherProps }) => (
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
      container: css => ({ ...css }),
      dropdownIndicator: css => ({ ...css, paddingLeft: 0 }),
      menu: css => ({ ...css, width: 300 }),
    }}
    components={{
      ...components,
      SingleValue: SingleValue,
    }}
  />
);

export default CountrySelect;
