import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldImageUploaderComponent from './components/FieldImageUploader';

const FieldImageUploader = withFormsy(
  ComponentHOC(FieldImageUploaderComponent),
);

export default FieldImageUploader;
