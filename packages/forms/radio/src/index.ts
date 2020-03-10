import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import RadioComponent from './components/Radio';
import RadioGroupComponent from './components/RadioGroup';
export { default as RadioStateless } from './components/RadioStateless';

const Radio = withFormsy(ComponentHOC(RadioComponent));
export const RadioGroup = withFormsy(ComponentHOC(RadioGroupComponent));

export default Radio;
