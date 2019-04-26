import React, { PureComponent } from 'react';
import { NavLink as Link } from 'react-router-dom';

export default class TabbarLink extends PureComponent {
  render() {
    return (
      <li className="nav-item">
        <Link
          className="nav-link d-flex align-items-center justify-content-center py-3"
          {...this.props}
        />
      </li>
    );
  }
}
