import React from 'react';
import { NavLink as Link } from 'react-router-dom';

export default function NavbarProfile({
  currentOrganization,
  currentUser,
  currentMember,
  ...otherProps
}) {
  return (
    <li className="nav-item dropdown">
      <a
        data-target="#"
        className="nav-link ml-2 py-2"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <img
          alt={currentUser.name}
          src={currentUser.avatar.thumb}
          width={34}
          className="rounded-circle"
        />
      </a>
      <ul className="dropdown-menu dropdown-menu-right">
        <h6 className="dropdown-header">{currentOrganization.name}</h6>
        <Link to={`/members/${currentMember.id}`} className="dropdown-item">
          Profilo
        </Link>
        <Link exact to="/community" className="dropdown-item">
          Community
        </Link>
        {currentMember.role === 'admin' && (
          <a className="dropdown-item" href="/dashboard">
            Scrivania
          </a>
        )}
        <div className="dropdown-divider" />
        <h6 className="dropdown-header">uidu.org</h6>
        <a className="dropdown-item" href="https://uidu.local:8443/dashboard">
          Account
        </a>
        <a
          rel="nofollow"
          className="dropdown-item"
          data-method="delete"
          href="/accounts/sign_out"
        >
          Logout
        </a>
      </ul>
    </li>
  );
}
