import React, { useState } from 'react';
import { CreatableProps } from 'react-select/creatable';
import {
  FieldExampleScaffold,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import { CreatableSelect } from '../src';

const defaultOptions = [
  { name: 'Adelaide', id: 'adelaide' },
  { name: 'Brisbane', id: 'brisbane' },
  { name: 'Canberra', id: 'canberra' },
  { name: 'Darwin', id: 'darwin' },
  { name: 'Hobart', id: 'hobart' },
  { name: 'Melbourne', id: 'melbourne' },
  { name: 'Perth', id: 'perth' },
  { name: 'Sydney', id: 'sydney' },
];

const createOption = (name) => ({
  name,
  id: name.toLowerCase().replace(/\W/g, ''),
});

export default function CreatableAdvanced() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(null);

  const handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    // this.setState({ value: newValue });
  };

  const handleCreate = (inputValue: any) => {
    // We do not assume how users would like to add newly created options to the existing options list.
    // Instead we pass users through the new value in the onCreate prop
    setIsLoading(true);
    console.group('Option created');
    console.log('Wait a moment...');
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    setIsLoading(false);
    setOptions([...options, newOption]);
    setValue(newOption.id);
  };

  return (
    <FieldExampleScaffold<CreatableProps<any, false, any>>
      component={CreatableSelect}
      {...inputDefaultProps}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  );
}
