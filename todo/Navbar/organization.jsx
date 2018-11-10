import React from 'react';
import { NavLink as Link } from 'react-router-dom';

export default function NavbarOrganizationProfile({
  currentOrganization,
  currentUser,
  currentMember,
  ...otherProps
}) {
  return (
    <li className="nav-item dropdown">
      <a
        data-target="#"
        className="nav-link mx-2 py-2"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          alt={currentOrganization.name}
          src={currentOrganization.avatar.thumb}
          style={{
            width: '2.5rem',
            height: '2.5rem',
          }}
          className="rounded"
        />
      </a>
      <ul className="dropdown-menu dropdown-menu-right">
        <h6 className="dropdown-header">{currentOrganization.name}</h6>
        <a className="dropdown-item" href="/dashboard">
          Scrivania
        </a>
        <a href="/" className="dropdown-item">
          Sito web
        </a>
        <div className="dropdown-divider" />
        <a className="dropdown-item" href="/settings">
          Account
        </a>
        <a className="dropdown-item" href="/integrations">
          Integrazioni
        </a>
      </ul>
    </li>
  );
}
