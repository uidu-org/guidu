import { colors } from '@uidu/theme';
import React, { Component } from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import { ColumnProps } from '../types';
import ItemList from './ItemsList';

export default class Column extends Component<ColumnProps> {
  render() {
    const { components, title, items, index } = this.props;
    const {
      columnHeader: Header,
      columnContainer: Container,
      columnFooter: Footer,
    } = components;

    return (
      <Draggable draggableId={title} index={index}>
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Header
              isDragging={snapshot.isDragging}
              items={items}
              title={title}
            />
            <ItemList
              components={components}
              listId={title}
              listType="QUOTE"
              style={{
                backgroundColor: snapshot.isDragging ? colors.G50 : null,
              }}
              items={items}
              internalScroll={this.props.isScrollable}
              isCombineEnabled={Boolean(this.props.isCombineEnabled)}
            />
            {Footer && (
              <Footer
                isDragging={snapshot.isDragging}
                items={items}
                title={title}
              />
            )}
          </Container>
        )}
      </Draggable>
    );
  }
}
