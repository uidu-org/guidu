import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Navbar extends PureComponent {
  render() {
    const { children, onMouseLeave } = this.props;
    return (
      <nav className="nav navbar-nav" onMouseLeave={onMouseLeave}>
        {children}
      </nav>
    );
  }
}

Navbar.propTypes = {
  onMouseLeave: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Navbar;
