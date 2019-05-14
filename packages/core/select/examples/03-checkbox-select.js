// @flow
import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { CheckboxSelect } from '../src';
import { cities } from './common/data';

// data imported for brevity; equal to the options from Single Select example
const CheckboxExample = () => (
  <Form {...formDefaultProps}>
    <CheckboxSelect
      {...inputDefaultProps}
      className="checkbox-select"
      classNamePrefix="select"
      options={[
        ...cities,
        {
          label:
            "super long name that no one will ever read because it's way too long to be a realistic option but it will highlight the flexbox grow and shrink styles",
          value: 'test',
        },
      ]}
      getOptionLabel={({ label }) => label}
      getOptionValue={({ value }) => value}
      placeholder="Choose a City"
    />
  </Form>
);

export default CheckboxExample;
