// @flow

import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base';

import { CountrySelect } from '../src';

const CountryExample = () => (
  <Form {...formDefaultProps}>
    <CountrySelect {...inputDefaultProps} placeholder="Country" />
  </Form>
);

export default CountryExample;
