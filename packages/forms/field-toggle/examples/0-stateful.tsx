import { Form } from '@uidu/form';
import React, { useRef } from 'react';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldToggle from '../src';

export default function Basic() {
  const ref = useRef();

  return (
    <Form {...formDefaultProps}>
      <div tw="space-y-3">
        <FieldToggle
          {...inputDefaultProps}
          label="Not checked"
          value={false}
          componentRef={ref}
        />
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel
                alias corrupti, ipsam recusandae qui aperiam nulla minus
                cupiditate, animi sint accusamus temporibus quo quasi veritatis
                ipsa sit nihil, iusto perspiciatis?
              </p>
            </div>
          }
        />
        <FieldToggle
          {...inputDefaultProps}
          name="Notifica su email"
          tw="bg-red-100"
          label={null}
        />
      </div>
    </Form>
  );
}
