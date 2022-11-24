import React from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { BoardComponents, ItemProps, ItemsListProps } from '../types';
import Item from './Item';

type ItemListProps<TItem, TColumn extends { id: string; name: string }> = {
  items: TItem[];
  components: BoardComponents<TItem, TColumn>;
};

function InnerItemList<TItem, TColumn extends { id: string; name: string }>(
  props: ItemListProps<TItem, TColumn>,
) {
  const { items, components } = props;
  if (items.length === 0) {
    return null;
  }

  return (items || []).map((item: ItemProps, index: number) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot,
      ) => (
        <Item
          key={item.id}
          item={item}
          components={components}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
}

type InnerListProps<TItem, TColumn extends { id: string; name: string }> = {
  dropProvided: DroppableProvided;
  items: TItem[];
  components?: BoardComponents<TItem, TColumn>;
};

function InnerList<TItem, TColumn extends { id: string; name: string }>(
  props: InnerListProps<TItem, TColumn>,
) {
  const { items, dropProvided, components } = props;

  const { innerListContainer: Container, innerListDropzone: DropZone } =
    components;

  return (
    <Container>
      <DropZone ref={dropProvided.innerRef}>
        <InnerItemList items={items} components={components} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function ItemList<TItem, TColumn>(
  props: ItemsListProps<
    TItem,
    TColumn extends { id: string; name: string } ? TColumn : never
  >,
) {
  const {
    components,
    ignoreContainerClipping,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    listId = 'LIST',
    listType,
    style,
    items,
    header,
    footer,
  } = props;

  const {
    itemsListWrapper: ItemsListWrapper,
    itemsListScrollContainer: ItemsListScrollContainer,
  } = components;

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <ItemsListWrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {header}
          {internalScroll ? (
            <ItemsListScrollContainer style={scrollContainerStyle}>
              <InnerList
                items={items}
                components={components}
                dropProvided={dropProvided}
              />
            </ItemsListScrollContainer>
          ) : (
            <InnerList
              items={items}
              components={components}
              dropProvided={dropProvided}
            />
          )}
          {footer}
        </ItemsListWrapper>
      )}
    </Droppable>
  );
}
