import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldTextComponent from './components/FieldText';
import FieldTextGridComponent from './components/FieldTextGrid';
export {
  default as FieldTextStateless,
  FieldTextStatelessWithoutAnalytics,
} from './components/FieldTextStateless';

export const FieldText = withFormsy(ComponentHOC(FieldTextComponent));
export const FieldTextGrid = withFormsy(ComponentHOC(FieldTextGridComponent));

export default FieldText;
