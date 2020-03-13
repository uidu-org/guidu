import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldToggleComponent from './components/FieldToggle';
export { default as FieldToggleStateless } from './components/FieldToggleStateless';

export const FieldToggle = withFormsy(ComponentHOC(FieldToggleComponent));

export default FieldToggle;
