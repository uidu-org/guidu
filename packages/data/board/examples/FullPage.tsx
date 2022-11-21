import Badge from '@uidu/badge';
import { ShellBody } from '@uidu/shell';
import React, { Component } from 'react';
import { MoreHorizontal, Plus } from 'react-feather';
import Board, { ColumnProps } from '../../board';
import { authorItemMap, authors } from '../examples-utils';

const Column = React.forwardRef<HTMLDivElement, ColumnProps>((props, ref) => (
  <div ref={ref} className="mr-3">
    <div className="card bg-light" {...props} />
  </div>
));

const ColumnHeader = ({ column, items, ...rest }) => {
  return (
    <div
      className="px-0 bg-transparent border-0 card-header d-flex justify-content-between"
      {...rest}
    >
      <div>
        <Badge>{items.length}</Badge>
        <span className="ml-2">{column.name}</span>
      </div>
      <div className="btn-group">
        <button>
          <Plus size={16} />
        </button>
        <button>
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

const Item = ({ item, provided, ...rest }) => {
  return (
    <div
      className="mb-2 bg-white card card-body"
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
        <div tw="py-4 pl-4 h-full" style={{ overflowX: 'auto' }}>
          <Board
            itemsMap={authorItemMap}
            columns={authors.map((author) => ({
              id: author.id,
              title: author.name,
              name: author.name,
            }))}
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
