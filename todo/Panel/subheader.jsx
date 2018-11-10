import React from 'react';
import PropTypes from 'prop-types';

export default function PanelSubHeader({ style, children }) {
  return (
    <div className="panel-subheader" style={style}>
      {children}
    </div>
  );
}

PanelSubHeader.propTypes = {
  style: PropTypes.shape(PropTypes.obj),
  children: PropTypes.node.isRequired,
};

PanelSubHeader.defaultProps = {
  style: undefined,
};
