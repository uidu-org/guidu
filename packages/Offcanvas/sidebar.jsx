import React from 'react';
import classNames from 'classnames';

export default function Sidebar({ className, layout, ...otherProps }) {
  return (
    <aside
      className={classNames('offcanvas-sidebar l-scrollable', className, {
        'l-sidebar': !!layout,
      })}
      {...otherProps}
    />
  );
}

Sidebar.defaultProps = {
  layout: false,
  className: null,
};
