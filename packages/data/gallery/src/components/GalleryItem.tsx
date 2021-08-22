import React from 'react';
import Item from './Item';

export default function GalleryItem({ item, tableInstance, onItemClick }) {
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
      <div tw="border rounded background[rgb(var(--body-on-primary-bg))]">
        <Item
          tableInstance={tableInstance}
          state={tableInstance.state}
          row={item}
          item={item}
        />
      </div>
    </div>
  );
}
