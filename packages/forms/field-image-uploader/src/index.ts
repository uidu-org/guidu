import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldImageUploaderComponent from './components/FieldImageUploader';
export {
  Container,
  Empty,
  Existing,
  Progress,
  Prompt,
  Toolbar,
} from './components';
export * from './types';
export * from './utils';

export const FieldImageUploader = withFormsy(
  ComponentHOC(FieldImageUploaderComponent),
);

export default FieldImageUploader;
