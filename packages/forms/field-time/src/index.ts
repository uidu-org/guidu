import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldTimeComponent from './components/FieldTime';
export { default as FieldTimeStateless } from './components/FieldTimeStateless';

export const FieldTime = withFormsy(ComponentHOC(FieldTimeComponent));

export default FieldTime;
