import React from 'react';

export default function Navbar({
  children,
  onMouseLeave,
}: {
  children: React.ReactNode;
  onMouseLeave: () => void;
}) {
  return (
    <nav className="nav navbar-nav flex-nowrap" onMouseLeave={onMouseLeave}>
      {children}
    </nav>
  );
}
