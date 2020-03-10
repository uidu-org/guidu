import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldToggleComponent from './components/FieldToggle';

const FieldToggle = withFormsy(ComponentHOC(FieldToggleComponent));

export default FieldToggle;
