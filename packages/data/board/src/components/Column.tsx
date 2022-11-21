import { colors } from '@uidu/theme';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ColumnProps } from '../types';
import ItemList from './ItemsList';

export default function Column<T>(props: ColumnProps<T>) {
  const {
    components,
    title,
    items,
    index,
    isDragDisabled,
    isScrollable,
    isCombineEnabled,
  } = props;

  const {
    columnHeader: Header,
    columnContainer: Container,
    columnFooter: Footer,
  } = components;

  return (
    <Draggable
      draggableId={title}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.draggableProps}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...provided.dragHandleProps}
        >
          <ItemList
            components={components}
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? colors.G50 : null,
            }}
            items={items}
            internalScroll={isScrollable}
            isCombineEnabled={Boolean(isCombineEnabled)}
            header={
              <Header
                isDragging={snapshot.isDragging}
                items={items}
                title={title}
              />
            }
            footer={
              Footer && (
                <Footer
                  isDragging={snapshot.isDragging}
                  items={items}
                  title={title}
                />
              )
            }
          />
          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}
