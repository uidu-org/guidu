import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import FieldPhoneComponent from './components/FieldPhone';
export {
  default as FieldPhoneStateless,
  FieldPhoneStatelessWithoutAnalytics,
} from './components/FieldPhoneStateless';

export const FieldPhone = withFormsy(ComponentHOC(FieldPhoneComponent));

export default FieldPhone;
