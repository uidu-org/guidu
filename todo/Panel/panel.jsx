import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Panel({ className, app, style, children }) {
  return (
    <div
      className={classNames('panel', className, {
        'panel-default': !app,
      })}
      style={style}
    >
      {children}
    </div>
  );
}

Panel.propTypes = {
  className: PropTypes.string,
  app: PropTypes.bool,
  style: PropTypes.shape(PropTypes.obj),
  children: PropTypes.node.isRequired,
};

Panel.defaultProps = {
  className: undefined,
  app: false,
  style: undefined,
};
