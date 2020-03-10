import { formDefaultProps } from '../../form/examples-utils';
import { Form } from '@uidu/form';
import React, { useRef } from 'react';

export const inputDefaultProps = {
  label: 'This is a form label',
  placeholder: 'This is a form placeholder',
  name: 'foo',
  onChange: console.log,
  // required: true,
  // help: <span className="text-primary">This is a node help</span>,
};

export function FieldRefTester({ component: Component, ...rest }) {
  const ref = useRef(null);
  return (
    <Form {...formDefaultProps}>
      <Component {...rest} innerRef={ref} />
      <div>
        <button
          onClick={e => {
            e.preventDefault();
            console.log(ref);
            ref.current.focus();
          }}
        >
          Focus compponet
        </button>
      </div>
    </Form>
  );
}
