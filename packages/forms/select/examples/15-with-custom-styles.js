// @flow
import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import Select from '../src';

const customStyles = {
  container(styles) {
    return { ...styles, width: '50%' };
  },
};

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
      placeholder="Choose a City"
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      styles={customStyles}
    />
  </Form>
);

export default SingleExample;
