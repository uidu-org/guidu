import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function PanelBody({ className, style, children }) {
  return (
    <div className={classNames(className, 'panel-body')} style={style}>
      {children}
    </div>
  );
}

PanelBody.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape(PropTypes.obj),
  children: PropTypes.node.isRequired,
};

PanelBody.defaultProps = {
  className: undefined,
  style: undefined,
};
