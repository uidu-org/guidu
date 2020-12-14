import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { selectDefaultProps } from '../examples-utils';
import Select from '../src';
import { cities } from './common/data';

// data imported for brevity; equal to the options from Single Select example
const MultiExample = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      {...selectDefaultProps}
      className="multi-select"
      classNamePrefix="react-select"
      // options={cities}
      multiple
      isSearchable={false}
      placeholder="Choose a City"
      value={[cities[0].id]}
    />
  </Form>
);

export default MultiExample;
