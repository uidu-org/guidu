/* eslint-disable react/jsx-props-no-spreading */
import { noop, useController, Wrapper } from '@uidu/field-base';
import { useFormContext } from '@uidu/form';
import React, { useState } from 'react';
import { getCountries, parsePhoneNumber } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en.json';
import tw from 'twin.macro';
import { FieldPhoneProps } from '../types';
import CountrySelect from './CountrySelect';
import FieldPhoneStateless from './FieldPhoneStateless';

export default function FieldPhone({
  name,
  value: defaultValue,
  onChange = noop,
  rules = {},
  country: defaultCountry,
  countryLabels = en,
  countries = getCountries(),
  withCountrySelect,
  ...rest
}: FieldPhoneProps) {
  const { setFocus, setError } = useFormContext();
  const { field, inputProps, wrapperProps } = useController({
    name,
    defaultValue,
    onChange,
    rules,
    ...rest,
  });

  const [guessedCountry, setGuessedCountry] = useState(
    field.value ? parsePhoneNumber(field.value)?.country : null,
  );

  const [country, setCountry] = useState(defaultCountry);

  const handleChange = (value: string) => {
    setGuessedCountry(value ? parsePhoneNumber(value)?.country : null);
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
              value={country || guessedCountry}
              onChange={(value) => {
                // if (
                //   field.value &&
                //   parsePhoneNumber(field.value) &&
                //   parsePhoneNumber(field.value).country !== value
                // ) {
                //   setError(name, { message: 'Attention' });
                // } else {
                setCountry(value);
                setFocus(name);
                // }
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
        country={country || guessedCountry}
        onChange={handleChange}
      />
    </Wrapper>
  );
}
