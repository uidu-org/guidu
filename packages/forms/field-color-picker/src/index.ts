import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldColorPickerComponent from './components/FieldColorPicker';

export const FieldColorPicker = withFormsy(
  ComponentHOC(FieldColorPickerComponent),
);

export default FieldColorPicker;
