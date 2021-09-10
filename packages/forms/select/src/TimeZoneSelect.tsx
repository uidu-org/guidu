import React from 'react';
import type { TimeZone } from 'timezones-list';
import Option from './components/Option';
import timezones from './data/timezones';
import Select from './FormsySelect';

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
const getOptionLabel = (opt: TimeZone) => opt.label;

// set the country's abbreviation for the option value, (also searchable)
const getOptionValue = (opt: TimeZone) => opt.tzCode;

// the text node of the control
const controlLabel = (opt: TimeZone) => (
  <Opt icon={opt.icon}>{opt.tzCode.toUpperCase()}</Opt>
);
// the text node for an option
const optionLabel = ({ value, label }: TimeZone) => <>{label}</>;

const SingleValue = ({ innerProps, data, getStyles, ...otherProps }) => {
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
};

// put it all together
function TimeZoneSelect({ components, ...otherProps }) {
  return (
    // @ts-ignore
    <Select
      {...otherProps}
      isClearable={false}
      // formatOptionLabel={formatOptionLabel}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      // isMulti={false}
      options={timezones}
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

export default TimeZoneSelect;
