import React from 'react';
import PropTypes from 'prop-types';

export default function NavbarAppActions({ brand, children, style }) {
  return (
    <nav className="d-flex pl-3 pl-xl-4 pr-3 py-4 py-xl-5" style={style}>
      {brand}
      <form className="flex-nowrap form-inline">{children}</form>
    </nav>
  );
}

NavbarAppActions.propTypes = {
  brand: PropTypes.node.isRequired,
  children: PropTypes.node,
  style: PropTypes.shape(PropTypes.obj),
};

NavbarAppActions.defaultProps = {
  style: null,
  children: null,
};
