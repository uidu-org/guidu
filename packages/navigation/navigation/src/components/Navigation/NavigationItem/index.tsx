import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
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
  ...otherProps
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [orderedItems, setItems] = useState(items);

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
      {orderedItems.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <AnimateHeight height={isOpen ? 'auto' : 0}>
                  {orderedItems.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                          )}
                        >
                          <NavigationSubItem {...item} visible />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </AnimateHeight>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}
