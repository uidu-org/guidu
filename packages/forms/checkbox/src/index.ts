import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import CheckboxComponent from './components/Checkbox';
import CheckboxGroupComponent from './components/CheckboxGroup';
export { default as CheckboxStateless } from './components/CheckboxStateless';

export const Checkbox = withFormsy(ComponentHOC(CheckboxComponent));
export const CheckboxGroup = withFormsy(ComponentHOC(CheckboxGroupComponent));

export default Checkbox;
