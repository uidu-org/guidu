import React from 'react';
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

export default function NavbarItem({
  onMouseEnter: propOnMouseEnter,
  index,
  name,
  path,
  onMouseLeave,
  children,
  className,
}: NavbarItemProps) {
  const onMouseEnter = () => {
    propOnMouseEnter(index);
  };
  return (
    <NavbarItemEl onMouseEnter={onMouseEnter} onFocus={onMouseEnter}>
      <NavbarItemTitle
        to={path}
        tw="py-3 list-none"
        className={className}
        // onMouseEnter={onMouseEnter}
        // onClick={onMouseLeave}
        // onFocus={onMouseEnter}
      >
        {name}
      </NavbarItemTitle>
      <DropdownSlot>{children}</DropdownSlot>
    </NavbarItemEl>
  );
}
