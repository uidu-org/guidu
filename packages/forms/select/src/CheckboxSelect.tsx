import React from 'react';
import { CheckboxOption } from './components/input-options';
import Select from './Select';

function CheckboxSelect({ components, ...props }: any) {
  return (
    <Select
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      multiple
      components={{ ...components, Option: CheckboxOption }}
      {...props}
    />
  );
}

export default CheckboxSelect;
