import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import styled from 'styled-components';
import {
  StyledNavigationAfter,
  StyledNavigationBefore,
  StyledNavigationItem,
  StyledNavigationText,
} from '../../../styled';
import NavigationActions from '../NavigationActions';
import NavigationSubItem from '../NavigationSubItem';
import SortableNavigationSubItems from '../NavigationSubItem/SortableNavigationSubItems';
import NavigationSubItemSkeleton from '../NavigationSubItemSkeleton';

const StyledNavigationActions = styled.div<{ $isActionOpen: boolean }>`
  position: absolute;
  right: 0rem;
  padding: 0.375rem;
  height: 100%;
  display: flex;
  opacity: ${({ $isActionOpen }) => ($isActionOpen ? 1 : 0)};
`;

export const StyledNavigationLink = styled.a.attrs(({ className }) => ({
  className: `nav-link${className ? ` ${className}` : ''}`,
}))<{ $actionsCount: number }>`
  align-items: center;
  cursor: pointer;
  display: flex;
  border-radius: 0.375rem;
  color: rgb(var(--body-secondary-color));
  padding: 0.375rem 0.5rem;
  position: relative;

  &:hover,
  &.active {
    background-color: rgb(var(--body-on-secondary-bg));
    color: rgb(var(--body-secondary-color));
  }

  &:hover ${StyledNavigationActions} {
    opacity: 1;
    background-color: rgb(var(--body-on-secondary-bg));
  }

  // &:hover ${StyledNavigationAfter} {
  //   transition: opacity linear 300ms;
  //   opacity: 0;
  // }

  &:hover ${StyledNavigationText} {
    padding-right: ${({ $actionsCount }) => `${$actionsCount * 2}rem`};
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
  isDisabled = false,
  onDragEnd,
  ...otherProps
}) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const [isActionOpen, setIsActionOpen] = useState(false);

  const renderSubItems = () => {
    if (isSortable) {
      return (
        <div className="w-100">
          <SortableNavigationSubItems
            orderedItems={items}
            onDragEnd={onDragEnd}
            isOpen={isOpen}
          />
        </div>
      );
    }

    return (
      <AnimateHeight height={isOpen ? 'auto' : 0} className="w-100">
        {items.map((item) =>
          item.type === 'NavigationSubItemSkeleton' ? (
            <NavigationSubItemSkeleton {...item} visible />
          ) : (
            <NavigationSubItem {...item} visible />
          ),
        )}
      </AnimateHeight>
    );
  };

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
          $actionsCount={actions.length}
          {...(isDisabled
            ? {
                tabIndex: -1,
                'aria-disabled': true,
                className: otherProps.className
                  ? `${otherProps.className} disabled`
                  : 'disabled',
              }
            : {})}
          {...otherProps}
        >
          {!!before && (
            <StyledNavigationBefore>{before}</StyledNavigationBefore>
          )}
          <StyledNavigationText
            $isActionOpen={isActionOpen}
            $actionsCount={actions.length}
          >
            {text}
          </StyledNavigationText>
          {!!after && <StyledNavigationAfter>{after}</StyledNavigationAfter>}
          {actions.length > 0 && (
            <StyledNavigationActions
              onClick={(e) => e.stopPropagation()}
              $isActionOpen={isActionOpen}
            >
              <NavigationActions
                actions={actions}
                onToggle={({ isOpen }) => setIsActionOpen(isOpen)}
              />
            </StyledNavigationActions>
          )}
        </StyledNavigationLink>
      </StyledNavigationItem>
      {items.length > 0 && renderSubItems()}
    </>
  );
}
