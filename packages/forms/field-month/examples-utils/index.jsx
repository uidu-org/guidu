import React from 'react';
import { FormSubmit } from '@uidu/form';

export const inputDefaultProps = {
  label: 'This is a form label',
  placeholder: 'This is a form placeholder',
  name: 'foo',
  onChange: console.log,
  // required: true,
  // help: <span className="text-primary">This is a node help</span>,
};

export const formDefaultProps = {
  className: 'mb-5',
  footerRenderer: ({ canSubmit }) => (
    <FormSubmit label="Save" canSubmit={canSubmit} />
  ),
  handleSubmit: console.log,
};
