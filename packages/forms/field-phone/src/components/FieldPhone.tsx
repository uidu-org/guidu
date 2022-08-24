/* eslint-disable react/jsx-props-no-spreading */
import { useController, Wrapper } from '@uidu/field-base';
import { useFormContext } from '@uidu/form';
import React, { useState } from 'react';
import { getCountries } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';
import tw from 'twin.macro';
import { FieldPhoneProps } from '../types';
import CountrySelect from './CountrySelect';
import FieldPhoneStateless from './FieldPhoneStateless';

export default function FieldPhone({
  name,
  value: defaultValue,
  onChange = () => {},
  rules,
  country: defaultCountry = 'IT',
  countryLabels = en,
  countries = getCountries(),
  withCountrySelect,
  ...rest
}: FieldPhoneProps) {
  const { setFocus } = useFormContext();
  const { field, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const [country, setCountry] = useState(defaultCountry);

  const handleChange = (value: string) => {
    field.onChange(value);
    onChange(field.name, value);
  };

  return (
    <Wrapper
      {...wrapperProps}
      addonsBefore={
        withCountrySelect && [
          <div>
            <CountrySelect
              countries={countries}
              labels={countryLabels}
              value={country}
              onChange={(value) => {
                setCountry(value);
                setFocus(name);
              }}
            />
          </div>,
        ]
      }
    >
      <FieldPhoneStateless
        {...rest}
        {...inputProps}
        css={[withCountrySelect && tw`pl-32`]}
        country={country}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
