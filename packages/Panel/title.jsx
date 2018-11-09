import React from 'react';
import PropTypes from 'prop-types';

export default function PanelTitle({ style, children }) {
  return <span style={style}>{children}</span>;
}

PanelTitle.propTypes = {
  style: PropTypes.shape(PropTypes.obj),
  children: PropTypes.node.isRequired,
};

PanelTitle.defaultProps = {
  style: undefined,
};
