import React, { PureComponent } from 'react';
import { NavLink as Link } from 'react-router-dom';

export default class TabbarLink extends PureComponent<any> {
  render() {
    const { to, ...otherProps } = this.props;
    return (
      <li className="nav-item">
        <Link
          to={to}
          className="nav-link d-flex flex-column align-items-center justify-content-center py-3"
          {...otherProps}
        />
      </li>
    );
  }
}
