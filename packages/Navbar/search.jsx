import React from 'react';

export default function NavbarSearch({ scope }) {
  return (
    <div className="navbar-search d-flex">
      <input
        type="search"
        className="form-control"
        autoComplete="off"
        placeholder="Cerca organizzazioni, persone, annunci, eventi e altro.."
      />
    </div>
  );
}
