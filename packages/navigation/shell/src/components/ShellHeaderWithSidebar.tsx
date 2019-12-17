import React from 'react';
import ShellHeader from './ShellHeader';

export default ({ children, sidebar }) => (
  <ShellHeader>
    <div className="container-fluid px-0">
      <div className="row align-items-center no-gutters">
        <div className="col-xl-9">{children}</div>
        <div className="col-xl-3 d-none d-xl-flex">{sidebar}</div>
      </div>
    </div>
  </ShellHeader>
);
