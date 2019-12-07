import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import styled from 'styled-components';
import { NavigationSubItem } from '../..';
import {
  StyledNavigationAfter,
  StyledNavigationBefore,
  StyledNavigationItem,
  StyledNavigationText,
} from '../../../styled';
import NavigationActions from '../NavigationActions';

const StyledNavigationActions = styled.div<{ isActionOpen: boolean }>`
  position: absolute;
  right: 0.25rem;
  display: ${({ isActionOpen }) => (isActionOpen ? 'flex' : 'none')};
`;

export const StyledNavigationLink = styled.a.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))`
  align-items: center;
  cursor: pointer;
  display: flex;
  border-radius: 0.25rem;
  color: #4c566a !important;
  transition: background-color linear 300ms;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  position: relative;

  &:hover,
  &.active {
    background-color: rgba(76, 86, 106, 0.085);
    color: #4c566a;
    transition: background-color linear 300ms;
  }

  &:hover ${StyledNavigationActions} {
    display: flex;
  }
`;

export default function NavigationItem({
  text,
  before = null,
  after = null,
  actions = [],
  items = [],
  ...otherProps
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);

  return (
    <>
      <StyledNavigationItem>
        <StyledNavigationLink
          {...otherProps}
          onClick={e => {
            e.preventDefault();
            setIsOpen(!isOpen);
          }}
        >
          {!!before && (
            <StyledNavigationBefore>{before}</StyledNavigationBefore>
          )}
          <StyledNavigationText>{text}</StyledNavigationText>
          {actions.length > 0 && (
            <StyledNavigationActions
              onClick={e => e.stopPropagation()}
              isActionOpen={isActionOpen}
            >
              <NavigationActions
                actions={actions}
                onToggle={({ isOpen }) => setIsActionOpen(isOpen)}
              />
            </StyledNavigationActions>
          )}
          {!!after && <StyledNavigationAfter>{after}</StyledNavigationAfter>}
        </StyledNavigationLink>
      </StyledNavigationItem>
      <AnimateHeight height={isOpen ? 'auto' : 0}>
        {items.length > 0 &&
          items.map(item => <NavigationSubItem {...item} visible />)}
      </AnimateHeight>
    </>
  );
}
