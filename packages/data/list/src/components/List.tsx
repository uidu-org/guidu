import { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useCallback, useRef } from 'react';
import { StyledRow } from '../styled';
import { ListProps } from '../types';
import Header from './Header';
import ItemSingle from './Item';

export default function List<T>({
  rowHeight = 48,
  gutterSize = 16,
  tableInstance,
  onItemClick,
  virtualizerOptions,
}: ListProps<T>) {
  const parentRef = useRef();

  const { getHeaderGroups, getRowModel } = tableInstance;

  const headerGroups = getHeaderGroups();
  const { rows } = getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    getItemKey: (index) => rows[index].original.id,
    estimateSize: useCallback(() => rowHeight, [rowHeight]),
    overscan: 5,
    ...(virtualizerOptions || {}),
  });

  const Item = useCallback(
    ({
      index,
      size,
      start,
    }: {
      index: number;
      size: number;
      start: number;
    }) => {
      const row: Row<T> = rows[index];

      // const isLoaderRow = index > rows.length - 1;

      // if (isLoaderRow) {
      //   return (
      //     <LoadingRow components={{ StyledRow }} start={start} size={size} />
      //   );
      // }

      return (
        <StyledRow $gutterSize={gutterSize} $size={size} $start={start}>
          <ItemSingle row={row} onItemClick={onItemClick} />
        </StyledRow>
      );
    },
    [rows, onItemClick, gutterSize],
  );

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
          {virtualRows.map(({ index, key, start, size }) => (
            <Item index={index} key={key} start={start} size={size} />
          ))}
        </div>
      </div>
    </div>
  );
}
