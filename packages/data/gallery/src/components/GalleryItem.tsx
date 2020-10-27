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
      className="col"
      key={item.id}
    >
      <div className="card bg-white">
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
