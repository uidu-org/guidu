import React from 'react';
import FormSubmit from '../FormSubmit';

export default ({ scope, ...otherProps }) => (
  <div className="row">
    <div className="col-sm-6 col-lg-4">
      <FormSubmit className={`btn btn-${scope} btn-block`} {...otherProps} />
    </div>
  </div>
);
