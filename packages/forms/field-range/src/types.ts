import { FieldBaseProps } from '@uidu/field-base';

export type FieldRangeStatelessProps = {
  id?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (e: React.ChangeEvent) => void;
  disabled?: boolean;
  valuePercent?: number;
  forwardedRef?: React.RefObject<any>;
};

export type FieldRangeProps = {} & FieldBaseProps &
  Omit<FieldRangeStatelessProps, 'onChange'>;
