import { FieldBaseProps } from '@uidu/field-base';
import { PopupProps } from '@uidu/popup';
import { AnyColor } from 'react-colorful/dist/types';

export type FieldColorPickerProps = FieldBaseProps<AnyColor> & {
  colors?: AnyColor[];
  trigger?: React.FC<{ toggleDialog; value; forwardedRef }>;
  popupProps?: Partial<PopupProps>;
  showInput?: boolean;
};
