import React from 'react';
import { CheckboxOption } from './components/input-options';
import Select from './Select';

const CheckboxSelect = ({ components, ...props }: any) => (
  <Select
    closeMenuOnSelect={false}
    hideSelectedOptions={false}
    isMulti
    components={{ ...components, Option: CheckboxOption }}
    {...props}
  />
);

export default CheckboxSelect;
