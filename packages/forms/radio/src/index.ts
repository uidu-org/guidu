import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import RadioComponent from './components/Radio';
import RadioGridComponent from './components/RadioGrid';
import RadioGroupComponent from './components/RadioGroup';
export { default as RadioStateless } from './components/RadioStateless';

export const Radio = withFormsy(ComponentHOC(RadioComponent));
export const RadioGroup = withFormsy(ComponentHOC(RadioGroupComponent));
export const RadioGrid = withFormsy(ComponentHOC(RadioGridComponent));

export default Radio;
