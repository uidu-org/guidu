import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldRangeComponent from './components/FieldRange';
export { default as FieldRangeStateless } from './components/FieldRangeStateless';

export const FieldRange = withFormsy(ComponentHOC(FieldRangeComponent));

export default FieldRange;
