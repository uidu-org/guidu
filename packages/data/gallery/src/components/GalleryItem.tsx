import React from 'react';
import Item from './Item';

export default function GalleryItem({
  item,
  columnIndex,
  rowIndex,
  style,
  data,
}) {
  const {
    items,
    gutterSize,
    onItemClick,
    columnDefs,
    primary,
    cover,
    avatar,
    sorters,
    tableInstance,
  } = data;

  if (!item) {
    return null;
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onItemClick({ data: item });
      }}
      className="col"
      key={item.id}
    >
      <div
        className="card bg-white"
        style={{
          marginLeft: gutterSize / 2,
          marginRight: gutterSize / 2,
        }}
      >
        <Item
          tableInstance={tableInstance}
          state={tableInstance.state}
          row={item}
          item={item}
          columnDefs={columnDefs}
          primary={primary}
          cover={cover}
          avatar={avatar}
          sorters={sorters}
        />
      </div>
    </div>
  );
}
