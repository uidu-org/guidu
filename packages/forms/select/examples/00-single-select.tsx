import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { selectDefaultProps } from '../examples-utils';
import Select from '../src';

const SingleExample = () => (
  <Form {...formDefaultProps}>
    <Select
      {...inputDefaultProps}
      {...selectDefaultProps}
      className="single-select"
      classNamePrefix="react-select"
      placeholder="Choose a City"
      value={selectDefaultProps.options[0].id}
    />
  </Form>
);

export default SingleExample;
