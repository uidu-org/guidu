import { Form } from '@uidu/form';
import React, { useEffect, useState } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldNumber from '../src';

export default function BasicExample({}) {
  const [defaultValue, setDefaultValue] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setDefaultValue(1000);
    }, 3000);
  }, []);
  console.log(defaultValue);
  return (
    <Form {...formDefaultProps}>
      <FieldNumber
        {...inputDefaultProps}
        label="Fiscal Code"
        options={{
          allowEmptyFormatting: true,
          format: '################',
          mask: '_',
        }}
      />
      <FieldNumber
        {...inputDefaultProps}
        value={defaultValue}
        label="Fiscal Code"
        options={{
          allowEmptyFormatting: true,
          format: '################',
          mask: '_',
        }}
      />
    </Form>
  );
}
