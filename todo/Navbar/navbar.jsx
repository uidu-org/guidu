import React from 'react';
import classNames from 'classnames';

// navbar-dark navbar-app-events
export default function Navbar({ className, ...otherProps }) {
  return (
    <nav
      {...otherProps}
      className={classNames(
        'navbar navbar-expand-lg flex-nowrap px-0 justify-content-between px-0 border-bottom navbar-light',
        // className,
      )}
    />
  );
}
