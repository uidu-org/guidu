import React from 'react';
import { NavLink as Link } from 'react-router-dom';

export const DropdownLink = ({ link, onMouseLeave, ...otherProps }) => {
  if (link.separator) {
    return <div className="dropdown-divider" />;
  }

  return (
    <Link to={link.path} className="dropdown-item" onClick={onMouseLeave}>
      {link.name}
    </Link>
  );
};
