import React from 'react';
import AnimateHeight from 'react-animate-height';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import NavigationSubItem from '..';
import NavigationItemSkeleton from '../../NavigationItemSkeleton';

const getItemStyle = (isDragging, draggableStyle) => ({
  borderRadius: '0.25rem',
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? 'rgba(76,86,106,0.125)' : '',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default function SortableNavigationSubItems({
  onDragEnd,
  isOpen,
  orderedItems,
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <AnimateHeight height={isOpen ? 'auto' : 0}>
              {orderedItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                      {item.type === 'NavigationItemSkeleton' ? (
                        <NavigationItemSkeleton {...item} />
                      ) : (
                        <NavigationSubItem {...item} visible />
                      )}
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
  );
}
