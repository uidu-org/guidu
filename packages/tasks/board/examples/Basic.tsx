import Badge from '@uidu/badge';
import React, { Component } from 'react';
import { MoreHorizontal, Plus } from 'react-feather';
import Board, { ColumnProps } from '..';
import { authorItemMap } from '../examples-utils';

const Column = React.forwardRef<HTMLDivElement, ColumnProps>((props, ref) => (
  <div ref={ref} className="card mr-3" {...props} />
));

const ColumnHeader = ({ title, items, ...rest }) => {
  return (
    <div className="card-header d-flex justify-content-between" {...rest}>
      <div>
        <Badge>{items.length}</Badge>
        <span className="ml-2">{title}</span>
      </div>
      <div>
        <Plus size={16} /> <MoreHorizontal size={16} className="ml-2" />
      </div>
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
    console.log(authorItemMap);
    return (
      <Board
        initial={authorItemMap}
        withScrollableColumns
        containerHeight="400px"
        components={{
          columnContainer: Column,
          columnHeader: ColumnHeader,
          item: Item,
        }}
      />
    );
  }
}
