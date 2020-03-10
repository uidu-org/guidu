import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldNumberComponent from './components/FieldNumber';
export { default as FieldNumberStateless } from './components/FieldNumberStateless';

const FieldNumber = withFormsy(ComponentHOC(FieldNumberComponent));

export default FieldNumber;
