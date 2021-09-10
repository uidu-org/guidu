import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { selectDefaultProps } from '../examples-utils';
import Select from '../src';

const SingleExample = () => (
  <Form {...formDefaultProps} onChange={console.log}>
    <Select
      {...inputDefaultProps}
      {...selectDefaultProps}
      placeholder="Choose a City"
      value={selectDefaultProps.options[0].id}
      isFocused
    />
  </Form>
);

export default SingleExample;
