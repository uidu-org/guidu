import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

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

export default class NavbarItem extends Component {
  static propTypes = {
    onMouseEnter: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.node,
  };

  onMouseEnter = () => {
    const { onMouseEnter, index } = this.props;
    onMouseEnter(index);
  };

  render() {
    const { title, path, onMouseLeave, children } = this.props;
    return (
      <NavbarItemEl
        onMouseEnter={this.onMouseEnter}
        onFocus={this.onMouseEnter}
      >
        <NavbarItemTitle
          to={`/${path}`}
          className="nav-link py-3"
          onMouseEnter={this.onMouseEnter}
          onClick={onMouseLeave}
          onFocus={this.onMouseEnter}
        >
          {title}
        </NavbarItemTitle>
        <DropdownSlot>{children}</DropdownSlot>
      </NavbarItemEl>
    );
  }
}
