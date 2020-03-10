import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldMonthComponent from './components/FieldMonth';
export { default as FieldMonthStateless } from './components/FieldMonthStateless';

const FieldMonth = withFormsy(ComponentHOC(FieldMonthComponent));

export default FieldMonth;
