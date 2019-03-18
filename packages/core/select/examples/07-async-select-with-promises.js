// @flow
import React, { Component } from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { cities } from './common/data';
import { AsyncSelect } from '../src';

type State = {
  inputValue: string,
};

const filterCities = (inputValue: string) =>
  cities.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterCities(inputValue));
    }, 1000);
  });

export default class WithPromises extends Component<*, State> {
  state = { inputValue: '' };
  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    return (
      <Form {...formDefaultProps}>
        <AsyncSelect
          {...inputDefaultProps}
          cacheOptions
          defaultOptions
          loadOptions={promiseOptions}
          getOptionLabel={({ label }) => label}
          getOptionValue={({ value }) => value}
        />
      </Form>
    );
  }
}
