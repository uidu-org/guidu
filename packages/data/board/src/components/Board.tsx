import React, { Component } from 'react';
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DroppableProvided,
  DropResult,
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
import { BoardProps, BoardState, ItemMapProps, ItemProps } from '../types';
import reorder, { reorderItemMap } from '../utils';
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

export default class Board extends Component<BoardProps, BoardState> {
  static defaultProps = {
    isCombineEnabled: false,
    withDraggableColumns: false,
    components: defaultComponents,
  };

  state: BoardState = {
    columns: this.props.initial,
    ordered: Object.keys(this.props.initial),
  };

  get components() {
    return {
      ...defaultComponents,
      ...this.props.components,
    };
  }

  private boardRef?: HTMLElement;

  onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow: string[] = [...this.state.ordered];
        shallow.splice(result.source.index, 1);
        this.setState({ ordered: shallow });
        return;
      }

      const column: ItemProps[] = this.state.columns[result.source.droppableId];
      const withItemRemoved: ItemProps[] = [...column];
      withItemRemoved.splice(result.source.index, 1);
      const columns: ItemMapProps = {
        ...this.state.columns,
        [result.source.droppableId]: withItemRemoved,
      };
      this.setState({ columns });
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === 'COLUMN') {
      const ordered: string[] = reorder(
        this.state.ordered,
        source.index,
        destination.index,
      );

      this.setState({
        ordered,
      });

      return;
    }

    const data = reorderItemMap({
      itemMap: this.state.columns,
      source,
      destination,
    });

    this.setState({
      columns: data.itemMap,
    });
  };

  render() {
    const columns: ItemMapProps = this.state.columns;
    const ordered: string[] = this.state.ordered;
    const {
      containerHeight,
      isCombineEnabled,
      withScrollableColumns,
      withDraggableColumns,
      columnDefs,
    } = this.props;

    const {
      container: ContainerComponent,
      parent: ParentContainerComponent,
    } = this.components;

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
                components={this.components}
                key={key}
                index={index}
                title={key}
                items={columns[key]}
                isScrollable={withScrollableColumns}
                isCombineEnabled={isCombineEnabled}
                isDragDisabled={!withDraggableColumns}
                columnDefs={columnDefs}
              />
            ))}
            {provided.placeholder}
          </ContainerComponent>
        )}
      </Droppable>
    );

    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          {containerHeight ? (
            <ParentContainerComponent height={containerHeight}>
              {board}
            </ParentContainerComponent>
          ) : (
            board
          )}
        </DragDropContext>
      </>
    );
  }
}
