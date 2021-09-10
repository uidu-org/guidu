import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import { CountrySelect, TimeZoneSelect } from '../src';

const CountryExample = () => (
  <Form {...formDefaultProps}>
    <CountrySelect {...inputDefaultProps} placeholder="Country" />
    <TimeZoneSelect {...inputDefaultProps} placeholder="Timezone" />
  </Form>
);

export default CountryExample;
