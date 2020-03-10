import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldTextareaComponent from './components/FieldTextarea';
export { default as FieldTextareaStateless } from './components/FieldTextareaStateless';

export const FieldTextarea = withFormsy(ComponentHOC(FieldTextareaComponent));

export default FieldTextarea;
