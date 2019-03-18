// @flow

import React from 'react';

import Select from './Select';
import { CheckboxOption } from './components/input-options';

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
