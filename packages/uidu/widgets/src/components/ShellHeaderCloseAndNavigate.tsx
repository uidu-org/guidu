import React from 'react';
import { X } from 'react-feather';
import { Link } from 'react-router-dom';

export default function ShellHeaderCloseAndNavigate({ to }: { to?: string }) {
  return (
    <div className="navbar-header">
      <Link className="navbar-brand d-flex align-items-center" to={to}>
        <X />
      </Link>
    </div>
  );
}
