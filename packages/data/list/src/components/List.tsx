import { Row, Table } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useCallback, useRef } from 'react';
import Header from './Header';
import Item from './Item';

export default function List<T>({
  rowHeight = 48,
  gutterSize = 16,
  tableInstance,
  onItemClick,
}: {
  rowHeight: number;
  headerIcons: any;
  gutterSize: number;
  tableInstance: Table<T>;
  onItemClick: (item: Row<T>) => void;
}) {
  const parentRef = useRef();

  const { getHeaderGroups, getRowModel } = tableInstance;

  const headerGroups = getHeaderGroups();
  const { rows } = getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5,
  });

  // const primary = getPrimary(columns);
  // const cover = getCover(columns);
  // const avatar = getAvatar(columns);

  const totalSize = rowVirtualizer.getTotalSize();
  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <div tw="h-full">
      <div ref={parentRef} tw="h-full w-full overflow-auto xl:px-4 px-3">
        <Header headerGroups={headerGroups} />
        <div
          tw="relative"
          style={{
            height: `${totalSize}px`,
            minHeight: `calc(100% - ${rowHeight * 2 - 8 - 16}px)`,
          }}
        >
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index];
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
