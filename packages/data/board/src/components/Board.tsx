import React, { useRef } from 'react';
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

export default function Board({
  isCombineEnabled = false,
  withDraggableColumns = false,
  components = defaultComponents,
  columns = {},
  containerHeight,
  withScrollableColumns,
  columnDefs,
  tableInstance,
  onDragEnd,
}: BoardProps) {
  const ordered = Object.keys(columns);
  const boardRef = useRef(null);

  const getComponents = () => {
    return {
      ...defaultComponents,
      ...components,
    };
  };

  // const onDragEnd = (result: DropResult) => {
  //   if (result.combine) {
  //     if (result.type === 'COLUMN') {
  //       const shallow: string[] = [...this.state.ordered];
  //       shallow.splice(result.source.index, 1);
  //       this.setState({ ordered: shallow });
  //       return;
  //     }

  //     const column: ItemProps[] = this.state.columns[result.source.droppableId];
  //     const withItemRemoved: ItemProps[] = [...column];
  //     withItemRemoved.splice(result.source.index, 1);
  //     const columns: ItemMapProps = {
  //       ...this.state.columns,
  //       [result.source.droppableId]: withItemRemoved,
  //     };
  //     this.setState({ columns });
  //     return;
  //   }

  //   // dropped nowhere
  //   if (!result.destination) {
  //     return;
  //   }

  //   const source: DraggableLocation = result.source;
  //   const destination: DraggableLocation = result.destination;

  //   // did not move anywhere - can bail early
  //   if (
  //     source.droppableId === destination.droppableId &&
  //     source.index === destination.index
  //   ) {
  //     return;
  //   }

  //   // reordering column
  //   if (result.type === 'COLUMN') {
  //     const ordered: string[] = reorder(
  //       this.state.ordered,
  //       source.index,
  //       destination.index,
  //     );

  //     this.setState({
  //       ordered,
  //     });

  //     return;
  //   }

  //   const data = reorderItemMap({
  //     itemMap: this.state.columns,
  //     source,
  //     destination,
  //   });

  //   this.setState({
  //     columns: data.itemMap,
  //   });
  // };

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
              columnDefs={columnDefs}
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
