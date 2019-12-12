import React from 'react';
import Item from './Item';

export default function GalleryItem({ columnIndex, rowIndex, style, data }) {
  const {
    items,
    gutterSize,
    onItemClick,
    columnDefs,
    primary,
    cover,
    avatar,
    sorters,
    filterModel,
  } = data;
  const item = items[rowIndex] && items[rowIndex][columnIndex];

  if (!item) {
    return null;
  }

  return (
    <div
      onClick={e => {
        e.preventDefault();
        onItemClick({ data: item.data });
      }}
      style={{
        position: 'absolute',
        cursor: 'pointer',
        transform: `translateX(${style.left}px) translateY(${style.top}px)`,
        width: style.width,
        height: style.height - gutterSize,
        transition: 'transform 300ms ease, height 300ms ease',
        willChange: 'transform',
      }}
      key={item.data.id}
    >
      <div
        className="card bg-white shadow-sm"
        style={{
          marginLeft: gutterSize / 2,
          marginRight: gutterSize / 2,
        }}
      >
        <Item
          item={item}
          columnDefs={columnDefs}
          primary={primary}
          cover={cover}
          avatar={avatar}
          sorters={sorters}
          filterModel={filterModel}
        />
      </div>
    </div>
  );
}
