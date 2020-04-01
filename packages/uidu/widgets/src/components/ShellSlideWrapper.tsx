import React from 'react';

export default function ShellSlideWrapper({ children, embedded = false }) {
  return (
    <div className="container my-3 my-md-5">
      <div className="row justify-content-center">
        <div className={`col-lg-${embedded ? 10 : 8}`}>{children}</div>
      </div>
    </div>
  );
}
