import React, { useCallback, useRef } from 'react';
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
import { BoardProps } from '../types';
import Column from './Column';

const defaultComponents = {
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
  tableInstance,
  onDragEnd,
  columns,
}: BoardProps<T>) {
  const ordered = Object.keys(columns);
  const boardRef = useRef(null);

  const getComponents = useCallback(
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
          {ordered.map((key: string, index: number) => (
            <Column
              components={getComponents()}
              key={key}
              index={index}
              title={key}
              items={columns[key]}
              isScrollable={withScrollableColumns}
              isCombineEnabled={isCombineEnabled}
              isDragDisabled={!withDraggableColumns}
              columns={columns}
              tableInstance={tableInstance}
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
