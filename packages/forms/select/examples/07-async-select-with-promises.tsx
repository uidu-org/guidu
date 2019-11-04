import { Form } from '@uidu/form';
import React, { Component } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { AsyncSelect } from '../src';
import { cities } from './common/data';

type State = {
  inputValue: string,
};

const filterCities = (inputValue: string) =>
  cities.filter(i => i.name.toLowerCase().includes(inputValue.toLowerCase()));

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
        />
      </Form>
    );
  }
}
