import { FieldBaseProps } from '@uidu/field-base';
import { PopupProps } from '@uidu/popup';
import { ForwardedRef } from 'react';
import { AnyColor } from 'react-colorful/dist/types';

export type FieldColorPickerProps = FieldBaseProps<AnyColor> & {
  colors?: AnyColor[];
  trigger?: React.FC<{
    toggleDialog: () => void;
    value: AnyColor;
    forwardedRef: ForwardedRef<HTMLButtonElement>;
  }>;
  popupProps?: Partial<PopupProps>;
  showInput?: boolean;
};
