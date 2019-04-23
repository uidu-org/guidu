import React, { Component } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

import classNames from 'classnames';

const NavbarItemTitle = styled(Link)`
  display: flex;
  justify-content: center;
  transition: opacity 250ms;
  cursor: pointer;
  /* position above the dropdown, otherwise the dropdown will cover up the bottom sliver of the buttons */
  position: relative;
  // z-index: 2;
  &:hover,
  &:focus {
    opacity: 0.9;
  }
`;

const NavbarItemEl = styled.li`
  align-self: center;
  position: relative;
`;

const DropdownSlot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  perspective: 1500px;
  margin-top: 0.5rem;
  // width: 50vw;
`;

export type NavbarItemProps = {
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  index: number;
  name: string;
  path: string;
  className?: string;
  children?: React.ReactNode;
};

export default class NavbarItem extends Component<NavbarItemProps> {
  onMouseEnter = () => {
    const { onMouseEnter, index } = this.props;
    onMouseEnter(index);
  };

  render() {
    const { name, path, onMouseLeave, children, className } = this.props;
    return (
      <NavbarItemEl
        onMouseEnter={this.onMouseEnter}
        onFocus={this.onMouseEnter}
      >
        <NavbarItemTitle
          to={path}
          className={classNames('nav-link py-3', className)}
          onMouseEnter={this.onMouseEnter}
          onClick={onMouseLeave}
          onFocus={this.onMouseEnter}
        >
          {name}
        </NavbarItemTitle>
        <DropdownSlot>{children}</DropdownSlot>
      </NavbarItemEl>
    );
  }
}
