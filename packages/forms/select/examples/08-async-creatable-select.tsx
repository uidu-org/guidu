import React, { useState } from 'react';
import {
  FieldExampleScaffold,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import { AsyncCreatableSelect as AsyncCreatable } from '../src';
import { cities } from './common/data';

type State = {
  allowCreateWhileLoading: boolean;
  options: Array<any>;
};

const createOption = (inputValue: string) => ({
  label: inputValue,
  value: inputValue.toLowerCase().replace(/\W/g, ''),
});

export default function AsyncCreatableExample() {
  const [options, setOptions] = useState(cities);

  const handleCreateOption = (inputValue: string) => {
    console.log('handleCreateOption here');
    setOptions([...options, createOption(inputValue)]);
  };
  // you control how the options are filtered
  const filterOptions = (inputValue: string) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  // async load function using callback (promises also supported)
  const loadOptions = (inputValue: string, callback?: Array<any>) => {
    setTimeout(() => {
      callback(filterOptions(inputValue));
    }, 1000);
  };

  return (
    <FieldExampleScaffold
      component={AsyncCreatable}
      {...inputDefaultProps}
      options={options}
      loadOptions={loadOptions}
      onCreateOption={handleCreateOption}
      placeholder="Choose a City"
    />
  );
}
