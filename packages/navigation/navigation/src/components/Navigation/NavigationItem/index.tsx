import React, { useEffect, useState } from 'react';
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
import SortableNavigationSubItems from '../NavigationSubItem/SortableNavigationSubItems';

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

const getItemStyle = (isDragging, draggableStyle) => ({
  borderRadius: '0.25rem',
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'rgba(76,86,106,0.125)' : '',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function NavigationItem({
  text,
  before = null,
  after = null,
  actions = [],
  items = [],
  isSortable = false,
  isOpen: isDefaultOpen = false,
  ...otherProps
}) {
  const [isOpen, setIsOpen] = useState(isDefaultOpen);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [orderedItems, setItems] = useState(items);

  useEffect(() => {
    setItems(items);
  }, items);

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      orderedItems,
      result.source.index,
      result.destination.index,
    );

    setItems(items);
  };

  const renderSubItems = () => {
    if (isSortable) {
      return (
        <SortableNavigationSubItems
          orderedItems={orderedItems}
          onDragEnd={onDragEnd}
          isOpen={isOpen}
        />
      );
    }

    return (
      <AnimateHeight height={isOpen ? 'auto' : 0}>
        {orderedItems.map(item => (
          <NavigationSubItem {...item} visible />
        ))}
      </AnimateHeight>
    );
  };

  return (
    <>
      <StyledNavigationItem>
        <StyledNavigationLink
          {...(orderedItems.length > 0
            ? {
                onClick: e => {
                  setIsOpen(!isOpen);
                },
              }
            : {})}
          {...otherProps}
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
      {orderedItems.length > 0 && renderSubItems()}
    </>
  );
}
