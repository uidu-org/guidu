import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldDateRangeComponent from './components/FieldDateRange';
export { default as FieldDateRangeStateless } from './components/FieldDateRangeStateless';

export const FieldDateRange = withFormsy(ComponentHOC(FieldDateRangeComponent));

export default FieldDateRange;
