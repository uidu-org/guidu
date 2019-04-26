import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';
import { NavLink as Link } from 'react-router-dom';

export default class Tabbar extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  render() {
    const { children } = this.props;
    return createPortal(
      <nav
        className="navbar-light justify-content-between bg-white p-0 border-top"
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          zIndex: 300,
          height: '3rem',
        }}
      >
        <ul className="nav nav-fill justify-content-center w-100 navbar-nav flex-row">
          {children}
        </ul>
      </nav>,
      this.el,
    );
  }
}
