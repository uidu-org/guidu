import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import { CountrySelect } from '../src';

export default function CountryExample() {
  return (
    <FieldExampleScaffold component={CountrySelect} placeholder="Country" />
  );
}

// const CountryExample = () => (
//   <Form {...formDefaultProps}>
//     <CountrySelect {...inputDefaultProps} placeholder="Country" />
//     <TimeZoneSelect {...inputDefaultProps} placeholder="Timezone" />
//   </Form>
// );

// export default CountryExample;
