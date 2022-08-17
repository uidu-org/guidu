import React from 'react';
import { RadioOption } from './components/input-options';
import Select from './Select';

function RadioSelect({ components, ...props }: any) {
  return (
    <Select
      {...props}
      isMulti={false}
      components={{ ...components, Option: RadioOption }}
    />
  );
}

export default RadioSelect;
