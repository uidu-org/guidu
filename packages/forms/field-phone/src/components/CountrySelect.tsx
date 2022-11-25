/* eslint-disable react/jsx-props-no-spreading */
import {
  allCountriesByCountryCode,
  GroupBase,
  OptionProps,
  SelectStateless,
  SingleValueProps,
} from '@uidu/select';
import React, { useMemo } from 'react';
import { Country, getCountryCallingCode } from 'react-phone-number-input/input';
import { CountryLabels } from '../types';

type CountryOptionId = Country | '';

type CountryOption = {
  id: CountryOptionId;
  name: string;
  before: string;
  callingCode: string;
};

function getUnicodeFlagIcon(country: Country) {
  return allCountriesByCountryCode[String(country)]?.before;
}

function Option(props: OptionProps<CountryOption>) {
  const { innerProps, getStyles, data } = props;
  return (
    <div
      {...innerProps}
      style={{
        ...getStyles('option', props),
      }}
    >
      <div tw="flex items-center mr-auto min-w-0 w-auto">
        <div tw="absolute w-5 h-5 flex items-center text-xl">{data.before}</div>
        <div tw="min-w-0 flex-1 pl-7">
          <div tw="mb-0 truncate">
            {data.callingCode ? `+${data.callingCode} ` : ''}
            {data.name}
          </div>
        </div>
      </div>
    </div>
  );
}

function SingleValue(props: SingleValueProps<CountryOption>) {
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
        <div tw="absolute w-5 h-5 flex items-center text-xl">{data.before}</div>
      )}
      <div tw="min-w-0 flex-1 pl-7">
        <div tw="truncate">
          {data.callingCode ? `+${data.callingCode}` : ''}
        </div>
      </div>
    </div>
  );
}

export default function CountrySelect({
  countries,
  value,
  onChange,
  labels,
  ...rest
}: {
  countries: Country[];
  value: Country;
  onChange: (country: Country) => void;
  labels: CountryLabels;
}) {
  const countryOptions = useMemo<CountryOption[]>(
    () =>
      countries.map((country) => ({
        id: country,
        name: labels[country],
        before: getUnicodeFlagIcon(country),
        callingCode: getCountryCallingCode(country),
      })),
    [labels, countries],
  );

  return (
    <SelectStateless<CountryOption, false, GroupBase<CountryOption>>
      {...rest}
      value={value}
      onChange={(option) => onChange(option.id)}
      getOptionLabel={(country) => labels[country.id]}
      getOptionValue={(country) => country.id}
      isClearable={false}
      options={[
        { id: '', name: labels.ZZ, before: '🌐', callingCode: undefined },
        ...countryOptions,
      ]}
      menuPortalTarget={document.body}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: 'transparent',
          width: '7rem',
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderRightWidth: '1px',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        menu: (base) => ({
          ...base,

          width: '400px',
        }),
      }}
      components={{
        Option,
        SingleValue,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        IndicatorsContainer: () => null,
      }}
    />
  );
}
