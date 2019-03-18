// @flow

import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { CountrySelect } from '../src';

const CountryExample = () => (
  <Form {...formDefaultProps}>
    <CountrySelect {...inputDefaultProps} placeholder="Country" />
  </Form>
);

export default CountryExample;
