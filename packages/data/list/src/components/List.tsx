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
    page,
  } = tableInstance;

  const rowVirtualizer = useVirtual({
    size: page.length,
    parentRef,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5,
  });

  // const primary = getPrimary(columns);
  // const cover = getCover(columns);
  // const avatar = getAvatar(columns);

  return (
    <div tw="h-full">
      <div ref={parentRef} tw="h-full w-full overflow-auto xl:px-4 px-3">
        <Header headerIcons={headerIcons} headerGroups={headerGroups} />
        <div
          tw="relative"
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            minHeight: `calc(100% - ${rowHeight * 2 - 8 - 16}px)`,
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = page[virtualRow.index];
            prepareRow(row);
            return (
              <div
                key={virtualRow.index}
                tw="border rounded absolute top-0 left-0 flex"
                style={{
                  background: 'white',
                  margin: `${gutterSize}px 0`,
                  height: `${virtualRow.size - gutterSize}px`,
                  transform: `translateY(${virtualRow.start}px)`,
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
