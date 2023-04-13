import { Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ScrollableContainer } from '@uidu/shell';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyledRow } from '../styled';
import { ListProps } from '../types';
import Header from './Header';
import ItemSingle from './Item';
import DefaultLoadingRow from './LoadingRow';
import DefaultLoadingSkeleton from './LoadingSkeleton';

export default function List<T>({
  rowHeight = 48,
  gutterSize = 16,
  tableInstance,
  onItemClick,
  virtualizerOptions,
  loadingRow: LoadingRow = DefaultLoadingRow,
  loadingSkeleton: LoadingSkeleton = DefaultLoadingSkeleton,
  // pagination
  pagination,
  // pending
  isPending = false,
}: ListProps<T>) {
  const parentRef = useRef();

  const { getHeaderGroups, getRowModel } = tableInstance;
  const { loadNext, isLoadingNext, hasNext } = pagination || {};

  const headerGroups = getHeaderGroups();
  const { rows } = getRowModel();

  const rowVirtualizer = useVirtualizer<HTMLDivElement>({
    count: hasNext ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current,
    getItemKey: (index) => rows[index]?.original?.id,
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

      const isLoaderRow = hasNext && index > rows.length - 1;

      if (isLoaderRow) {
        return null;
      }

      return (
        <StyledRow $gutterSize={gutterSize} $size={size} $start={start}>
          <ItemSingle row={row} onItemClick={onItemClick} />
        </StyledRow>
      );
    },
    [rows, onItemClick, gutterSize, hasNext],
  );

  // const primary = getPrimary(columns);
  // const cover = getCover(columns);
  // const avatar = getAvatar(columns);

  const totalSize = rowVirtualizer.getTotalSize();
  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    // This makes effect optional, if we passed in a loadNext function then it should trigger it when we scroll to the bottom
    if (!loadNext) {
      return;
    }

    const [lastItem] = [...virtualRows].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= rows.length - 1 &&
      hasNext &&
      !isLoadingNext &&
      !isPending
    ) {
      loadNext();
    }
  }, [loadNext, hasNext, rows.length, virtualRows, isLoadingNext, isPending]);

  return (
    <ScrollableContainer
      ref={parentRef}
      tw="h-full w-full overflow-auto xl:px-4 px-3 z-20 min-w-0 min-h-0"
      // style={{
      //   WebkitOverflowScrolling: 'auto',
      //   WebkitBackfaceVisibility: 'hidden',
      //   overscrollBehavior: 'contain contain',
      //   flex: '0 1 auto',
      //   overflowY: 'auto',
      //   height: 300,
      // }}
    >
      <Header headerGroups={headerGroups} />
      <div
        tw="relative flex flex-col"
        style={{
          height: `${totalSize}px`,
          minHeight: `calc(100% - ${rowHeight * 2 - 8 - 16}px)`,
          flex: '0 1 auto',
        }}
      >
        {isPending ? (
          <LoadingSkeleton
            count={50}
            rowHeight={rowHeight}
            gutterSize={gutterSize}
          />
        ) : (
          virtualRows.map(({ index, key, start, size }) => (
            <Item index={index} key={key} start={start} size={size} />
          ))
        )}
      </div>
    </ScrollableContainer>
  );
}
