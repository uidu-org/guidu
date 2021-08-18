import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import SelectComponent from './Select';

const Select = withFormsy(ComponentHOC(SelectComponent));

export default Select;
