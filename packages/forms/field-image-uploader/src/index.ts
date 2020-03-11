import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldImageUploaderComponent from './components/FieldImageUploader';
export { default as Prompt } from './components/Prompt';

export const FieldImageUploader = withFormsy(
  ComponentHOC(FieldImageUploaderComponent),
);

export default FieldImageUploader;
