// @flow
import React from 'react';
import { Form, formDefaultProps } from '@uidu/form';
import { inputDefaultProps } from '@uidu/field-base';

import FieldToggle from '../src';

export default () => (
  <Form {...formDefaultProps}>
    <FieldToggle {...inputDefaultProps} label="Not checked" value={false} />
    <FieldToggle {...inputDefaultProps} label="Undefined" name="foo2" />
    <FieldToggle
      {...inputDefaultProps}
      name="already-checked"
      label="Large (checked by default)"
      size="large"
      value={true}
    />
    <FieldToggle
      {...inputDefaultProps}
      name="Notifica su email"
      label={
        <div>
          <h6 className="mb-0">Notifica su email</h6>
          <p className="small text-muted text-form">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel alias
            corrupti, ipsam recusandae qui aperiam nulla minus cupiditate, animi
            sint accusamus temporibus quo quasi veritatis ipsa sit nihil, iusto
            perspiciatis?
          </p>
        </div>
      }
    />
    <br />
  </Form>
);
