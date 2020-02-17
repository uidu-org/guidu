import Spinner from '@uidu/spinner';
import React from 'react';

export default ({ className = null, style = {} }) => (
  <div
    className={`card h-100 align-items-center justify-content-center${
      className ? ` ${className}` : ''
    }`}
    style={style}
  >
    <Spinner />
  </div>
);
