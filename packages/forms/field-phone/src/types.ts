import { FieldBaseProps } from '@uidu/field-base';
import { AllHTMLAttributes } from 'react';
import { Country } from 'react-phone-number-input';

export type FieldPhoneProps = FieldBaseProps<string> &
  Omit<FieldPhoneStatelessProps, 'onChange'>;

export type FieldPhoneStatelessProps = AllHTMLAttributes<HTMLInputElement> & {
  country?: Country;
  onChange?: (value: string) => void;
};
