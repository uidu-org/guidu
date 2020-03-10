import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldDownshiftComponent from './components/FieldDownshift';
export * from './components/items';

export const FieldDownshift = withFormsy(ComponentHOC(FieldDownshiftComponent));

export default FieldDownshift;
