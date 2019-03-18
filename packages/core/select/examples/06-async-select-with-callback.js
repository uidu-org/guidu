// @flow

import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { AsyncSelect } from '../src';

import { cities } from './common/data';

// you control how the options are filtered
const filter = (inputValue: string) =>
  cities.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()));

// async load function using callback (promises also supported)
const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filter(inputValue));
  }, 1000);
};

const AsyncExample = () => (
  <Form {...formDefaultProps}>
    <AsyncSelect
      {...inputDefaultProps}
      className="async-select-with-callback"
      classNamePrefix="react-select"
      defaultOptions
      loadOptions={loadOptions}
      options={cities}
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      placeholder="Choose a City"
    />
  </Form>
);

export default AsyncExample;
