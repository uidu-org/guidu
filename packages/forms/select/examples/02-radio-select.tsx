import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { RadioSelect } from '../src';
import { cities } from './common/data';

// data imported for brevity; equal to the options from Single Select example
const RadioExample = () => (
  <Form {...formDefaultProps}>
    <RadioSelect
      {...inputDefaultProps}
      className="radio-select"
      classNamePrefix="react-select"
      options={[
        ...cities,
        {
          name:
            "super long name that noone will ever read because it's way too long",
          id: 'test',
        },
      ]}
      placeholder="Choose a City"
    />
  </Form>
);

export default RadioExample;
