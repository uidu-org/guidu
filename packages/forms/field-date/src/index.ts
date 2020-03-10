import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldDateComponent from './components/FieldDate';
export {
  default as FieldDateStateless,
  FieldDateStatelessWithoutAnalytics,
} from './components/FieldDateStateless';

const FieldDate = withFormsy(ComponentHOC(FieldDateComponent));

export default FieldDate;
