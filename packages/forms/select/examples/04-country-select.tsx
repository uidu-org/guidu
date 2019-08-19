import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { CountrySelect } from '../src';

const CountryExample = () => (
  <Form {...formDefaultProps}>
    <CountrySelect {...inputDefaultProps} placeholder="Country" />
  </Form>
);

export default CountryExample;
