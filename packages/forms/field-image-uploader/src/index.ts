import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldImageUploaderComponent from './components/FieldImageUploader';
export * from './components';
export * from './types';
export * from './utils';

export const FieldImageUploader = withFormsy(
  ComponentHOC(FieldImageUploaderComponent),
);

export default FieldImageUploader;
