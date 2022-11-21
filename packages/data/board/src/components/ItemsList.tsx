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

type ItemListProps = {
  items: ItemProps[];
  components: BoardComponents;
  columnDefs?: any;
};

function InnerItemListComponent(props: ItemListProps) {
  const { items, components } = props;
  return items.map((item: ItemProps, index: number) => (
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

const InnerItemList = React.memo(InnerItemListComponent);

type InnerListProps = {
  dropProvided: DroppableProvided;
  items: ItemProps[];
  components?: BoardComponents;
  columnDefs?: any;
};

function InnerList(props: InnerListProps) {
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

export default function ItemList<T>(props: ItemsListProps<T>) {
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
