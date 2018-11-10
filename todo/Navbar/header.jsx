import React from 'react';

export default function NavbarHeader({ brand, children }) {
  return (
    <div className="d-none d-lg-inline-flex navbar-header align-items-center">
      <a
        href="/dashboard"
        className="navbar-brand d-none d-lg-inline-flex align-items-center py-0"
      >
        <img
          alt={brand.name}
          src={brand.avatar.thumb}
          width={28}
          style={{ marginLeft: 2 }}
          className="rounded mr-3"
        />{' '}
        {brand.name}
      </a>
      {children}
    </div>
  );
}
