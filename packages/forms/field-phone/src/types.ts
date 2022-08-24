import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';
import { Country, LabelKey, Props } from 'react-phone-number-input';

export type CountryLabels = { [key in LabelKey]: string };

export type FieldPhoneProps = FieldBaseProps<string> & {
  withCountrySelect?: boolean;
  // countryLabels: CountryLabels;
} & Props<{}> &
  Omit<FieldPhoneStatelessProps, 'onChange'>;

export type FieldPhoneStatelessProps = AllHTMLAttributes<HTMLInputElement> & {
  country?: Country;
  onChange?: (value: string) => void;
};
