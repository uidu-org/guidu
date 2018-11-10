import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function PanelFooter({ className, style, children }) {
  return (
    <div className={classNames(className, 'panel-footer')} style={style}>
      {children}
    </div>
  );
}

PanelFooter.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(PropTypes.obj),
  children: PropTypes.node.isRequired,
};

PanelFooter.defaultProps = {
  className: undefined,
  style: undefined,
};
