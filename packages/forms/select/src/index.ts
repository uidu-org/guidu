export { components, createFilter, mergeStyles } from 'react-select';
export { makeAsyncSelect } from 'react-select/async';
export { makeCreatableSelect } from 'react-select/creatable';
export { default as CheckboxSelect } from './CheckboxSelect';
export { CheckboxOption, RadioOption } from './components/input-options';
export { default as CountrySelect } from './CountrySelect';
export { allCountries } from './data/countries';
export { default as PopupSelect } from './PopupSelect';
export { default as RadioSelect } from './RadioSelect';
import { ComponentHOC } from '@uidu/field-base';
import { withFormsy } from 'formsy-react';
import AsyncCreatableSelectComponent from './AsyncCreatableSelect';
import AsyncSelectComponent from './AsyncSelect';
import CreatableSelectComponent from './CreatableSelect';
import SelectComponent from './Select';

const Select = withFormsy(ComponentHOC(SelectComponent));

export const AsyncCreatableSelect = withFormsy(
  ComponentHOC(AsyncCreatableSelectComponent),
);
export const AsyncSelect = withFormsy(ComponentHOC(AsyncSelectComponent));
export const CreatableSelect = withFormsy(
  ComponentHOC(CreatableSelectComponent),
);

export default Select;
