import React, { useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import {
  ColumnContainer,
  ColumnHeader,
  ColumnTitle,
  Container,
  Item,
  ItemsListContainer,
  ItemsListDropZone,
  ItemsListScrollContainer,
  ItemsListWrapper,
  ParentContainer,
} from '../styled';
import { BoardComponents, BoardProps } from '../types';
import Column from './Column';

const defaultComponents: BoardComponents<unknown> = {
  container: Container,
  parent: ParentContainer,
  columnHeader: ColumnHeader,
  columnTitle: ColumnTitle,
  columnContainer: ColumnContainer,
  columnFooter: null,
  itemsListWrapper: ItemsListWrapper,
  itemsListScrollContainer: ItemsListScrollContainer,
  innerListContainer: ItemsListContainer,
  innerListDropzone: ItemsListDropZone,
  item: Item,
};

export default function Board<T>({
  isCombineEnabled = false,
  withDraggableColumns = false,
  components = defaultComponents,
  containerHeight,
  withScrollableColumns,
  onDragEnd,
  columns,
  itemsMap,
}: BoardProps<T>) {
  const getComponents = useCallback<() => BoardComponents<T>>(
    () => ({
      ...defaultComponents,
      ...components,
    }),
    [components],
  );

  const { container: ContainerComponent, parent: ParentContainerComponent } =
    getComponents();

  const board = (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping={Boolean(containerHeight)}
      isCombineEnabled={isCombineEnabled}
    >
      {(provided: DroppableProvided) => (
        <ContainerComponent
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {columns.map((column, index: number) => (
            <Column
              components={getComponents()}
              key={column.id}
              index={index}
              title={column.name}
              items={itemsMap[column.id]}
              isScrollable={withScrollableColumns}
              isCombineEnabled={isCombineEnabled}
              isDragDisabled={!withDraggableColumns}
            />
          ))}
          {provided.placeholder}
        </ContainerComponent>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {containerHeight ? (
        <ParentContainerComponent height={containerHeight}>
          {board}
        </ParentContainerComponent>
      ) : (
        board
      )}
    </DragDropContext>
  );
}
