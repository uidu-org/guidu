import { lighten } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
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
  display: flex;
  /* transition: opacity linear 300ms; */
  opacity: ${({ isActionOpen }) => (isActionOpen ? 1 : 0)};
`;

export const StyledNavigationLink = styled.a.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))`
  align-items: center;
  cursor: pointer;
  display: flex;
  border-radius: 0.25rem;
  color: ${`${lighten(0.2, '#4c566a')} !important`};
  transition: background-color linear 300ms;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 1.25rem;
  padding-right: 0.75rem;
  font-size: 0.935rem;
  position: relative;

  &:hover,
  &.active {
    background-color: rgba(76, 86, 106, 0.085);
    color: #4c566a;
    transition: background-color linear 300ms;
  }

  &:hover ${StyledNavigationActions} {
    transition: opacity linear 300ms;
    opacity: 1;
  }

  &:hover ${StyledNavigationText} {
    padding-right: 2rem;
  }
`;

export default function NavigationSubItem({
  text,
  before,
  after,
  visible,
  actions = [],
  ...rest
}) {
  const [isActionOpen, setIsActionOpen] = useState(false);

  if (visible) {
    return (
      <StyledNavigationItem>
        <StyledNavigationLink {...rest}>
          {!!before && (
            <StyledNavigationBefore>{before}</StyledNavigationBefore>
          )}
          <StyledNavigationText
            isActionOpen={isActionOpen}
            actionsCount={actions.length}
          >
            {text}
          </StyledNavigationText>
          {actions.length > 0 && (
            <StyledNavigationActions
              onClick={e => e.stopPropagation()}
              isActionOpen={isActionOpen}
            >
              <NavigationActions
                actions={actions}
                onToggle={({ isOpen }) => setIsActionOpen(isOpen)}
                isCollapsed
              />
            </StyledNavigationActions>
          )}
          {!!after && <StyledNavigationAfter>{after}</StyledNavigationAfter>}
        </StyledNavigationLink>
      </StyledNavigationItem>
    );
  }
  return null;
}
