// @flow
import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { selectDefaultProps } from '../examples-utils';
import Select from '../src';

const SingleExample = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      {...selectDefaultProps}
      className="single-select"
      classNamePrefix="react-select"
      // options={[
      //   { label: 'Adelaide', value: 'adelaide' },
      //   { label: 'Brisbane', value: 'brisbane' },
      //   { label: 'Canberra', value: 'canberra' },
      //   { label: 'Darwin', value: 'darwin' },
      //   { label: 'Hobart', value: 'hobart' },
      //   { label: 'Melbourne', value: 'melbourne' },
      //   { label: 'Perth', value: 'perth' },
      //   { label: 'Sydney', value: 'sydney' },
      // ]}
      placeholder="Choose a City"
    />
  </Form>
);

export default SingleExample;
