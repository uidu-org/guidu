// @flow
import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import Select from '../src';

const GROUP_OPTIONS = [
  {
    label: 'Group I',
    options: [
      { label: 'Adelaide', value: 'adelaide' },
      { label: 'Brisbane', value: 'brisbane' },
    ],
  },
  {
    label: 'Group II',
    options: [
      { label: 'Canberra', value: 'canberra' },
      { label: 'Darwin', value: 'darwin' },
    ],
  },
];

const SingleExample = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      options={GROUP_OPTIONS}
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      placeholder="Choose a City"
    />
  </Form>
);

export default SingleExample;
