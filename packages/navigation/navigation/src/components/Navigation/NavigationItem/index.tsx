import React from 'react';
import styled from 'styled-components';
import {
  StyledNavigationAfter,
  StyledNavigationBefore,
  StyledNavigationItem,
  StyledNavigationText,
} from '../../../styled';

const DropdownSlot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  perspective: 1500px;
  margin-top: 0.5rem;
  // width: 50vw;
  z-index: 20;
`;

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
  color: currentColor;
  transition: background-color linear 300ms;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  position: relative;
  font-weight: 500;

  &:hover,
  &.active {
    color: currentColor;
    /* color: var(--body-color); */
  }
`;

export default function NavigationItem({
  text,
  before = null,
  after = null,
  children,
  ...otherProps
}) {
  return (
    <>
      <StyledNavigationItem>
        <StyledNavigationLink {...otherProps}>
          <>
            {!!before && (
              <StyledNavigationBefore>{before}</StyledNavigationBefore>
            )}
            <StyledNavigationText>{text}</StyledNavigationText>
            {!!after && <StyledNavigationAfter>{after}</StyledNavigationAfter>}
          </>
        </StyledNavigationLink>
        <DropdownSlot>{children}</DropdownSlot>
      </StyledNavigationItem>
    </>
  );
}
