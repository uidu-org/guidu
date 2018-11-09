import React from 'react';
import PropTypes from 'prop-types';

export default function PanelLink({ style, children }) {
  return (
    <div className="pull-right panel-link" style={style}>
      {children}
    </div>
  );
}

PanelLink.propTypes = {
  style: PropTypes.shape(PropTypes.obj),
  children: PropTypes.node.isRequired,
};

PanelLink.defaultProps = {
  style: undefined,
};
