import { Form } from '@uidu/form';
import React, { Component } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
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

export default class WithPromises extends Component<any, State> {
  state = { inputValue: '', value: '', options: [] };
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  setValue = (option) => {
    console.log(option);
    this.setState({
      value: { name: option.name, id: option.id },
      options: [option],
    });
  };

  render() {
    const { inputValue, value, options } = this.state;
    return (
      <Form {...formDefaultProps}>
        <AsyncSelect
          {...inputDefaultProps}
          value={value.id}
          objValue={value}
          inputValue={inputValue}
          onInputChange={(v) => {
            console.log(v);
            this.setState({ inputValue: v });
          }}
          cacheOptions
          loadOptions={promiseOptions}
          onChange={(_name, _value, { option }) => {
            console.log(_value);
            this.setValue(option);
          }}
        />
      </Form>
    );
  }
}
