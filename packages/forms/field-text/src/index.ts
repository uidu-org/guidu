import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldTextComponent from './components/FieldText';
export {
  default as FieldTextStateless,
  FieldTextStatelessWithoutAnalytics,
} from './components/FieldTextStateless';

const FieldText = withFormsy(ComponentHOC(FieldTextComponent));

export default FieldText;
