import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export default function NavbarActions({ children }) {
  if (document && document.getElementById('navbar-actions')) {
    return createPortal(children, document.getElementById('navbar-actions'));
  }

  return null;
}

NavbarActions.propTypes = {
  children: PropTypes.node.isRequired,
};
