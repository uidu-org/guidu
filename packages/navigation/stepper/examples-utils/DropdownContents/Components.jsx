import React from 'react';
import classNames from 'classnames';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Heading = styled.h3`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0.25rem;
  color: ${({ color }) => (color ? `var(--${color})` : 'var(--blue)')};
`;

export const HeadingLink = Heading.withComponent('li');

export const LinkList = styled.ul`
  li {
    margin-bottom: 1rem;
  }

  li:last-of-type {
    margin-bottom: 0;
  }

  margin-left: ${props => (props.marginLeft ? props.marginLeft : 0)};
`;

export const Icon = styled.div`
  width: 13px;
  height: 13px;
  margin-right: 13px;
  background-color: var(--blue);
  opacity: 0.8;
  display: inline-block;
`;

export const DropdownSection = styled.div`
  padding: 1rem;
  position: relative;
  z-index: 1;
`;

export const DropdownLink = ({ link, onMouseLeave, ...otherProps }) => {
  if (link.separator) {
    return <div className="dropdown-divider" />;
  }

  return (
    <Link
      {...otherProps}
      activeClassName="font-weight-bold text-teams"
      to={link.path}
      className={classNames('dropdown-item', link.className)}
      onClick={onMouseLeave}
    >
      {link.name}
    </Link>
  );
};
