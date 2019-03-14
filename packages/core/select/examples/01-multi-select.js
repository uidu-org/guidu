// @flow
import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base';

import Select from '../src';
import { cities } from './common/data';

// data imported for brevity; equal to the options from Single Select example
const MultiExample = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      className="multi-select"
      classNamePrefix="react-select"
      options={cities}
      isMulti
      isSearchable={false}
      placeholder="Choose a City"
    />
  </Form>
);

export default MultiExample;
