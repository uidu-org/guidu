import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import Select from '../src';

const GROUP_OPTIONS = [
  {
    label: 'Group I',
    options: [
      { name: 'Adelaide', id: 'adelaide' },
      { name: 'Brisbane', id: 'brisbane' },
    ],
  },
  {
    label: 'Group II',
    options: [
      { name: 'Canberra', id: 'canberra' },
      { name: 'Darwin', id: 'darwin' },
    ],
  },
];

const SingleExample = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      options={GROUP_OPTIONS}
      placeholder="Choose a City"
    />
  </Form>
);

export default SingleExample;
