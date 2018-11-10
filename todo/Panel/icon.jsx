import React from 'react';
import PropTypes from 'prop-types';

export default function PanelIcon({ icon, title, className }) {
  return <img src={icon} alt={title} className={className} />;
}

PanelIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
};

PanelIcon.defaultProps = {
  className: undefined,
};
