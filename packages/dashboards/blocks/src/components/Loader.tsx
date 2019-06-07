import Spinner from '@uidu/spinner';
import React from 'react';

export default ({ className = null }) => (
  <div
    className={`card h-100 align-items-center justify-content-center${
      className ? ` ${className}` : ''
    }`}
  >
    <Spinner />
  </div>
);
