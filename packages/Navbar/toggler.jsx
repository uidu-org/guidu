import React from 'react';

export default function NavbarToggler() {
  return (
    <button
      className="navbar-toggler navbar-toggler-left mx-3 d-flex d-lg-none"
      type="button"
      data-toggle="offcanvas"
      data-target="#main-navigation"
      aria-controls="sidebar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  );
}
