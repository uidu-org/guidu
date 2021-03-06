import React, { useCallback, useRef } from 'react';
import { useVirtual } from 'react-virtual';
import Header from './Header';
import Item from './Item';

export default function List({
  rowHeight,
  headerIcons,
  gutterSize = 16,
  tableInstance,
  onItemClick,
}) {
  const parentRef = useRef();

  const {
    headerGroups,
    prepareRow,
    state: { filterBy },
    columns,
    rows,
  } = tableInstance;

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5,
  });

  // const primary = getPrimary(columns);
  // const cover = getCover(columns);
  // const avatar = getAvatar(columns);

  return (
    <div className="h-100">
      <div
        ref={parentRef}
        className="List px-xl-4 px-3"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
      >
        <Header headerIcons={headerIcons} headerGroups={headerGroups} />
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            minHeight: `calc(100% - ${rowHeight * 2 - 8 - 16}px)`,
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index];
            prepareRow(row);
            return (
              <div
                key={virtualRow.index}
                className="border rounded"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: 'white',
                  margin: `${gutterSize}px 0`,
                  height: `${virtualRow.size - gutterSize}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: 'flex',
                }}
              >
                <Item row={row} onItemClick={onItemClick} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
