import { FieldBaseProps } from '@uidu/field-base';

export type FieldPhoneProps = FieldBaseProps &
  Omit<FieldPhoneStatelessProps, 'forwardedRef'>;

export type FieldPhoneStatelessProps = {
  id?: string;
  country?: string;
  onChange?: (value: string) => void;
  className?: string;
  value?: string;
  forwardedRef?: React.RefObject<any>;
};
