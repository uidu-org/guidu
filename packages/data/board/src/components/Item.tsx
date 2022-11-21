import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { BoardComponents } from '../types';

type Props<T> = {
  item: T;
  isDragging: boolean;
  provided: DraggableProvided;
  isGroupedOver?: boolean;
  components: BoardComponents<T>;
};

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function ItemItem<T>(props: Props<T>) {
  const { item, components, isDragging, isGroupedOver, provided } = props;

  const { item: Item } = components;

  return (
    <Item
      item={item}
      provided={provided}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {/* {item.content} */}
    </Item>
  );
}

export default ItemItem;
