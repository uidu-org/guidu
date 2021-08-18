import React from 'react';
import { RadioOption } from './components/input-options';
import Select from './FormsySelect';

const RadioSelect = ({ components, ...props }: any) => (
  <Select
    {...props}
    isMulti={false}
    components={{ ...components, Option: RadioOption }}
  />
);

export default RadioSelect;
