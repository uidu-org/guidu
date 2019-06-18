import React from 'react';
import FormSubmit from '../src/submit';

const later = (delay, value) =>
  new Promise(resolve => setTimeout(resolve, delay, value));

export const formDefaultProps = {
  footerRenderer: ({ canSubmit, loading }) => (
    <FormSubmit label="Save" canSubmit={canSubmit} loading={loading} />
  ),
  handleSubmit: model => later(3000, model).then(console.log),
};
