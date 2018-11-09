import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function PanelHeader({ className, style, children }) {
  return (
    <div className={classNames(className, 'panel-heading')} style={style}>
      <h3 className="panel-title">{children}</h3>
    </div>
  );
}

PanelHeader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(PropTypes.obj),
  children: PropTypes.node.isRequired,
};

PanelHeader.defaultProps = {
  className: undefined,
  style: undefined,
};
