// @flow

import React, { Component } from 'react';
import {
  DragDropContext,
  type DropResult,
  type DragStart,
  type HookProvided,
} from 'react-beautiful-dnd';
import { LayoutEventEmitter } from '../../presentational/LayoutManager/LayoutEvent';

import type { SortableContextProps } from './types';

export default class SortableContext extends Component<SortableContextProps> {
  onDragStart = (
    [start, provided]: [DragStart, HookProvided],
    emit: () => void,
  ) => {
    emit();
    if (this.props.onDragStart) {
      this.props.onDragStart(start, provided);
    }
  };

  onDragEnd = (
    [result, provided]: [DropResult, HookProvided],
    emit: () => void,
  ) => {
    emit();
    if (this.props.onDragEnd) {
      this.props.onDragEnd(result, provided);
    }
  };

  render() {
    const { children, onDragUpdate } = this.props;
    return (
      <LayoutEventEmitter>
        {({ emitItemDragStart, emitItemDragEnd }) => (
          <DragDropContext
            onDragUpdate={onDragUpdate}
            onDragStart={(...args) => this.onDragStart(args, emitItemDragStart)}
            onDragEnd={(...args) => this.onDragEnd(args, emitItemDragEnd)}
          >
            {children}
          </DragDropContext>
        )}
      </LayoutEventEmitter>
    );
  }
}
