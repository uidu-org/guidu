import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldFileUploaderComponent from './components/FieldFileUploader';

export const FieldFileUploader = withFormsy(
  ComponentHOC(FieldFileUploaderComponent),
);

export default FieldFileUploader;
