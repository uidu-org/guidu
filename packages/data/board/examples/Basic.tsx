import Badge from '@uidu/badge';
import React, { forwardRef, useState } from 'react';
import { MoreHorizontal, Plus } from 'react-feather';
import Board, { ColumnProps } from '../../board';
import { authorItemMap } from '../examples-utils';
import reorder, { ItemMapProps, ItemProps, reorderItemMap } from '../src';

const Column = React.forwardRef<HTMLDivElement, ColumnProps>((props, ref) => (
  <div ref={ref} tw="mr-3 border rounded h-full" {...props} />
));

const ColumnHeader = ({ title, items, ...rest }) => {
  return (
    <div tw="p-4 flex justify-between" {...rest}>
      <div>
        <Badge>{items.length}</Badge>
        <span tw="ml-2">{title}</span>
      </div>
      <div>
        <Plus size={16} /> <MoreHorizontal size={16} tw="ml-2" />
      </div>
    </div>
  );
};

const Item = forwardRef(({ item, provided, ...rest }, ref) => {
  return (
    <div ref={ref} tw="mb-2 bg-white rounded border p-4" {...rest}>
      {item.content}
    </div>
  );
});

export default function Basic() {
  const [columns, setColumns] = useState<ItemMapProps>(authorItemMap);
  const [ordered, setOrdered] = useState(Object.keys(authorItemMap));

  const onDragEnd = (result: DropResult) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow: string[] = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column: ItemProps[] = columns[result.source.droppableId];
      const withItemRemoved: ItemProps[] = [...column];
      withItemRemoved.splice(result.source.index, 1);
      setColumns((prevColumns) => ({
        ...prevColumns,
        [result.source.droppableId]: withItemRemoved,
      }));
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
      const reordered: string[] = reorder(
        ordered,
        source.index,
        destination.index,
      );

      setOrdered(reordered);

      return;
    }

    const data = reorderItemMap({
      itemMap: columns,
      source,
      destination,
    });

    setColumns(data.itemMap);
  };

  return (
    <Board
      onDragEnd={onDragEnd}
      columns={columns}
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
