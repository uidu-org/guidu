import React, { useState } from 'react';
import styled from 'styled-components';
import {
  StyledNavigationAfter,
  StyledNavigationBefore,
  StyledNavigationItem,
  StyledNavigationText,
} from '../../../styled';

const StyledNavigationActions = styled.div<{ $isActionOpen: boolean }>`
  position: absolute;
  right: 0.25rem;
  display: flex;
  transition: opacity linear 300ms;
  opacity: ${({ $isActionOpen }) => ($isActionOpen ? 1 : 0)};
`;

export const StyledNavigationLink = styled.a.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))`
  align-items: center;
  cursor: pointer;
  display: flex;
  border-radius: 0.25rem;
  color: var(--body-color) !important;
  transition: background-color linear 300ms;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  position: relative;

  &:hover,
  &.active {
    background-color: var(--light);
    color: var(--body-color);
    transition: background-color linear 300ms;
  }

  &:hover ${StyledNavigationActions} {
    transition: opacity linear 300ms;
    opacity: 1;
  }
`;

export default function NavigationItem({
  text,
  before = null,
  after = null,
  actions = [],
  items = [],
  isSortable = false,
  isOpen: isDefaultOpen = false,
  onDragEnd,
  ...otherProps
}) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const [isActionOpen, setIsActionOpen] = useState(false);

  return (
    <>
      <StyledNavigationItem>
        <StyledNavigationLink
          {...(items.length > 0
            ? {
                onClick: (e) => {
                  setIsOpen(!isOpen);
                },
              }
            : {})}
          {...otherProps}
        >
          {!!before && (
            <StyledNavigationBefore>{before}</StyledNavigationBefore>
          )}
          <StyledNavigationText $isActionOpen={isActionOpen}>
            {text}
          </StyledNavigationText>
          {!!after && <StyledNavigationAfter>{after}</StyledNavigationAfter>}
        </StyledNavigationLink>
      </StyledNavigationItem>
      {/* {items.length > 0 && renderSubItems()} */}
    </>
  );
}
