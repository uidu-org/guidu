import React from 'react';

export default function ShellSlideWrapper({ children }) {
  return (
    <div className="container my-3 my-md-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">{children}</div>
      </div>
    </div>
  );
}
