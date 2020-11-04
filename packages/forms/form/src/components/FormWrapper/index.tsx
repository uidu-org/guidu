import React from 'react';

export default function FormWrapper({ children }) {
  return (
    <div className="container-fluid py-4 py-xl-5">
      <div className="row no-gutters justify-content-md-center">
        <div className="col-sm-12 col-md-11 col-xl-9">{children}</div>
      </div>
    </div>
  );
}
