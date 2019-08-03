// @flow
import { ComponentHOC } from '@uidu/field-base';
import CheckboxComponent from './Checkbox';
import CheckboxGroupComponent from './CheckboxGroup';


export const Checkbox = ComponentHOC(CheckboxComponent);
export const CheckboxGroup = ComponentHOC(CheckboxGroupComponent);

export default Checkbox;
