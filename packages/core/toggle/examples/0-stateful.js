// @flow
import React from 'react';
import Toggle from '../src';

export default () => (
  <div>
    <div className="form-group">
      <label htmlFor="regular" className="control-label">
        Regular
      </label>
      <div>
        <Toggle />
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="large" className="control-label">
        Large (checked by default)
      </label>
      <div>
        <Toggle size="large" isDefaultChecked />
      </div>
    </div>
  </div>
);
