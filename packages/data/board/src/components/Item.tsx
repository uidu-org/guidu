import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { BoardComponents, ItemProps } from '../types';

type Props<TItem, TColumn extends { id: string; name: string }> = {
  item: ItemProps<TItem>;
  isDragging: boolean;
  provided: DraggableProvided;
  isGroupedOver?: boolean;
  components: BoardComponents<TItem, TColumn>;
};

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function ItemItem<TItem, TColumn extends { id: string; name: string }>(
  props: Props<TItem, TColumn>,
) {
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
    />
  );
}

export default ItemItem;
