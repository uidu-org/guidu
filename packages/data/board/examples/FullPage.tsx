import Badge from '@uidu/badge';
import { ShellBody } from '@uidu/shell';
import React, { Component } from 'react';
import { MoreHorizontal, Plus } from 'react-feather';
import Board, { ColumnProps } from '../../board';
import { authorItemMap } from '../examples-utils';

const Column = React.forwardRef<HTMLDivElement, ColumnProps>((props, ref) => (
  <div ref={ref} className="mr-3">
    <div className="card bg-light" {...props} />
  </div>
));

const ColumnHeader = ({ title, items, ...rest }) => {
  return (
    <div
      className="card-header border-0 bg-transparent d-flex justify-content-between"
      {...rest}
    >
      <div>
        <Badge>{items.length}</Badge>
        <span className="ml-2">{title}</span>
      </div>
      <button>
        <Plus size={16} />
      </button>
      <button>
        <MoreHorizontal size={16} className="ml-2" />
      </button>
    </div>
  );
};

const Item = ({ item, provided, ...rest }) => {
  return (
    <div
      className="card card-body bg-white mb-2"
      ref={provided.innerRef}
      {...rest}
    >
      {item.content}
    </div>
  );
};

export default class Basic extends Component<any> {
  render() {
    return (
      <ShellBody>
        <div className="py-4 pl-4 h-100" style={{ overflowX: 'auto' }}>
          <Board
            initial={authorItemMap}
            withScrollableColumns
            withDraggableColumns
            components={{
              columnContainer: Column,
              columnHeader: ColumnHeader,
              item: Item,
            }}
          />
        </div>
      </ShellBody>
    );
  }
}
