import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
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
