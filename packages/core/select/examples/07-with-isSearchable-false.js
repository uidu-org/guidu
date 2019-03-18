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
      isSearchable={false}
      placeholder="Choose a City"
    />
  </Form>
);

export default SingleExample;
