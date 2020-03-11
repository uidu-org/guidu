import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldPasswordComponent from './components/FieldPassword';
export { default as FieldPasswordStateless } from './components/FieldPasswordStateless';

export const FieldPassword = withFormsy(ComponentHOC(FieldPasswordComponent));

export default FieldPassword;
