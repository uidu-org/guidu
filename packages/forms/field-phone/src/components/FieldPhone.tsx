/* eslint-disable react/jsx-props-no-spreading */
import { useController, Wrapper } from '@uidu/field-base';
import React from 'react';
// import {
//   getCountries,
//   getCountryCallingCode,
// } from 'react-phone-number-input/input';
// import en from 'react-phone-number-input/locale/en.json';
import { FieldPhoneProps } from '../types';
import FieldPhoneStateless from './FieldPhoneStateless';

// const CountrySelect = ({ value, onChange, labels, ...rest }) => (
//   <select
//     {...rest}
//     value={value}
//     onChange={(event) => onChange(event.target.value || undefined)}
//   >
//     <option value="">{labels['ZZ']}</option>
//     {getCountries().map((country) => (
//       <option key={country} value={country}>
//         {labels[country]} +{getCountryCallingCode(country)}
//       </option>
//     ))}
//   </select>
// );

export default function FieldPhone({
  name,
  value: defaultValue,
  onChange = () => {},
  rules,
  ...rest
}: FieldPhoneProps) {
  const { field, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const handleChange = (value: string) => {
    field.onChange(value);
    onChange(field.name, value);
  };

  return (
    <Wrapper
      {...wrapperProps}
      // addonsBefore={[
      //   <div>
      //     <CountrySelect labels={en} onChange={onChange} />
      //   </div>,
      // ]}
    >
      <FieldPhoneStateless {...rest} {...inputProps} onChange={handleChange} />
    </Wrapper>
  );
}
