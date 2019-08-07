import React from 'react';
import ShellHeader from './ShellHeader';

export default ({ children, sidebar }) => (
  <ShellHeader className="px-xl-4 px-3">
    <div className="container-fluid px-0">
      <div className="row align-items-center">
        <div className="col-xl-9">
          <div className="d-flex align-items-center">{children}</div>
        </div>
        <div className="col-xl-3 d-none d-xl-flex">{sidebar}</div>
      </div>
    </div>
  </ShellHeader>
);
