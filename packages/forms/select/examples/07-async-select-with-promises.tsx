import React, { useState } from 'react';
import {
  FieldExampleScaffold,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import { AsyncSelect } from '../src';
import { cities } from './common/data';

type State = {
  inputValue: string;
};

const filterCities = (inputValue: string) =>
  cities.filter((i) => i.name.toLowerCase().includes(inputValue.toLowerCase()));

const promiseOptions = async (inputValue) => {
  const response = await fetch(
    `http://stipendiogiusto.local:5500/jobs?q=${inputValue}`,
  );
  return response.json();
};

export default function WithPromisesExample() {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    setInputValue(inputValue);
    return inputValue;
  };

  const handleSetValue = (option) => {
    console.log(option);
    setValue({ ...option });
    setOptions([option]);
  };

  return (
    <FieldExampleScaffold
      component={AsyncSelect}
      {...inputDefaultProps}
      options={[]}
      value={value.id}
      objValue={value}
      inputValue={inputValue}
      onInputChange={(v) => {
        console.log(v);
        setInputValue(v);
        // this.setState({ inputValue: v });
      }}
      cacheOptions
      loadOptions={promiseOptions}
      onChange={(_name, _value, { option }) => {
        console.log(_value);
        handleSetValue(option);
        // this.setValue(option);
      }}
    />
  );
}
