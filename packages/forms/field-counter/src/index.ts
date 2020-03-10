import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldCounterComponent from './components/FieldCounter';
export { default as FieldCounterStatelesss } from './components/FieldCounterStateless';

export const FieldCounter = withFormsy(ComponentHOC(FieldCounterComponent));

export default FieldCounter;
