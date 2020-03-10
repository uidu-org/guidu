import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldGeosuggestComponent from './components/FieldGeosuggest';

const FieldGeosuggest = withFormsy(ComponentHOC(FieldGeosuggestComponent));

export default FieldGeosuggest;
