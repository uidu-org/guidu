// @flow
import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import Select from '../src';

const SingleExample = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      options={[
        { label: 'Adelaide', value: 'adelaide' },
        { label: 'Brisbane', value: 'brisbane' },
        { label: 'Canberra', value: 'canberra' },
        { label: 'Darwin', value: 'darwin' },
        { label: 'Hobart', value: 'hobart' },
        { label: 'Melbourne', value: 'melbourne' },
        { label: 'Perth', value: 'perth' },
        { label: 'Sydney', value: 'sydney' },
      ]}
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      placeholder="Choose a City"
      isMulti
      maxMenuHeight={100}
    />
  </Form>
);

export default SingleExample;
