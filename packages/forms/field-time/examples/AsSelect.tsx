import { inputDefaultProps } from '@uidu/field-base/examples-utils';
import { Form } from '@uidu/form';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { formDefaultProps } from '../../form/examples-utils';
import FieldTime from '../src';

export default function AsSelect() {
  return (
    <IntlProvider locale="en">
      <Form {...formDefaultProps}>
        <FieldTime
          {...inputDefaultProps}
          label="With change, blur & focus handlers"
          asSelect
        />
      </Form>
    </IntlProvider>
  );
}
