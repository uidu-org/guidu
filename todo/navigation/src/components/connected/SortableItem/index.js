// @flow

import React, { Component } from 'react';
import { colors } from '@atlaskit/theme';
import { Draggable } from 'react-beautiful-dnd';

import Item from '../../presentational/Item';
import type { SortableItemProps } from './types';

const getStyles = (provided, { isDragging }) => {
  return {
    ...provided,
    itemBase: {
      ...provided.itemBase,
      boxShadow: isDragging
        ? `${colors.N60A} 0px 4px 8px -2px, ${colors.N60A} 0px 0px 1px`
        : undefined,
      cursor: isDragging ? 'grabbing' : 'pointer',
    },
  };
};

export default class SortableItem extends Component<SortableItemProps> {
  render() {
    const { index, ...itemProps } = this.props;
    return (
      <Draggable
        draggableId={itemProps.id}
        index={index}
        disableInteractiveElementBlocking
      >
        {(draggableProvided, draggableSnapshot) => {
          const draggableProps = {
            ...draggableProvided.draggableProps,
            ...draggableProvided.dragHandleProps,
          };

          // disable onClick if the intention was drag
          const onClick = draggableSnapshot.isDragging
            ? undefined
            : itemProps.onClick;

          return (
            <Item
              draggableProps={draggableProps}
              innerRef={draggableProvided.innerRef}
              isDragging={draggableSnapshot.isDragging}
              styles={getStyles}
              {...itemProps}
              onClick={onClick}
            />
          );
        }}
      </Draggable>
    );
  }
}
