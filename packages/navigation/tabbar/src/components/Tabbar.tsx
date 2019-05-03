import { ShellFooter } from '@uidu/shell';
import React, { PureComponent } from 'react';
import { TabbarProps } from '../types';

export default class Tabbar extends PureComponent<TabbarProps> {
  static defaultProps = {
    className: 'navbar-light justify-content-between bg-white p-0 border-top',
  };

  render() {
    const { children, className, ...otherProps } = this.props;
    return (
      <ShellFooter className={className} {...otherProps}>
        <ul className="nav nav-fill navbar-nav flex-row align-items-center">
          {children}
        </ul>
      </ShellFooter>
    );
  }
}
