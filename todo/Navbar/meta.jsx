import React from 'react';

export default function NavbarMeta({ ...otherProps }) {
  return (
    <div className="collapse navbar-collapse justify-content-end">
      <ul
        className="nav navbar-nav align-items-center px-3 px-md-4"
        {...otherProps}
      />
    </div>
  );
}
