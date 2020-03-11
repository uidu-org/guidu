import { Form } from '@uidu/form';
import React from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldNumber from '../src';

export default function BasicExample({}) {
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
    </Form>
  );
}
