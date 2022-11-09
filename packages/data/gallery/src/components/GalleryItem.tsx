import { Row, Table } from '@tanstack/react-table';
import React from 'react';
import Item from './Item';

export default function GalleryItem<T>({
  item,
  tableInstance,
  onItemClick,
}: {
  item: Row<T>;
  tableInstance: Table<T>;
  onItemClick: (item: T) => void;
}) {
  if (!item) {
    return null;
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onItemClick(item);
      }}
      key={item.id}
    >
      <div tw="border rounded [background:rgb(var(--body-on-primary-bg))]">
        <Item tableInstance={tableInstance} item={item} />
      </div>
    </div>
  );
}
