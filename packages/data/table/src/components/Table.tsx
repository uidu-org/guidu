/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */

import { flexRender, Row as RowType } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useCallback, useEffect, useRef } from 'react';
import * as defaultComponents from '../styled';
import { TableProps } from '../types';
import { getComponents } from '../utils';
import Footer from './Footer';
import Resizer from './Resizer';
import RowSingle from './Row';

function Table<T extends object>({
  // overrideable props
  includeFooter = true,
  rowHeight = 32,
  headerHeight = 48,
  virtualizerOptions,
  //
  tableInstance,
  onItemClick,
  overrides = {},
  // pagination
  pagination,
}: TableProps<T>) {
  const { getHeaderGroups, getFooterGroups, getRowModel } = tableInstance;
  const { loadNext, isLoadingNext, hasNext } = pagination || {};

  const headerGroups = getHeaderGroups();
  const footerGroups = getFooterGroups();
  const { rows } = getRowModel();

  const {
    Th: { component: Th, props: trProps },
    Td: { component: Td, props: tdProps },
    StyledRow: { component: StyledRow, props: rowProps },
    Body: { component: Body, props: bodyProps },
  } = getComponents(defaultComponents, overrides);

  const Row = useCallback(
    ({
      index,
      size,
      start,
    }: {
      index: number;
      size: number;
      start: number;
    }) => {
      const row: RowType<T> = rows[index];

      const isLoaderRow = index > rows.length - 1;

      if (isLoaderRow) {
        return (
          <StyledRow start={start} size={size}>
            <div tw="h-full w-full bg-gray-50 flex items-center p-4">
              Loading...
            </div>
          </StyledRow>
        );
      }

      return (
        <RowSingle<T>
          row={row}
          rowHeight={rowHeight}
          size={size}
          start={start}
          components={{ Td, StyledRow }}
          onItemClick={onItemClick}
        />
      );
    },
    [rows, rowHeight, onItemClick, StyledRow, Td],
  );

  const parentRef = useRef<HTMLDivElement>();

  const rowVirtualizer = useVirtualizer({
    count: hasNext ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current,
    overscan: 10,
    estimateSize: () => rowHeight,
    getItemKey: (index) => rows[index]?.original?.id,
    ...(virtualizerOptions || {}),
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  useEffect(() => {
    // This makes effect optional, if we passed in a loadNext function then it should trigger it when we scroll to the bottom
    if (!loadNext) {
      return;
    }

    const [lastItem] = [...virtualRows].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= rows.length - 1 && hasNext && !isLoadingNext) {
      loadNext();
    }
  }, [loadNext, hasNext, rows.length, virtualRows, isLoadingNext]);

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <div tw="h-full" role="table">
      <div ref={parentRef} tw="h-full w-full overflow-auto">
        {/* <div
          style={{
            // width: tableInstance.getTotalSize(),
            minWidth: '100%',
          }}
          tw="h-full overflow-auto"
        > */}
        <div tw="background[rgb(var(--body-on-primary-bg))] flex flex-col min-w-full top-0 sticky z-10 w-max">
          {headerGroups.map((headerGroup) => {
            return (
              <div tw="flex min-w-full" key={headerGroup.id}>
                {headerGroup.headers
                  .filter((header) => !header.column.columnDef.meta?.isPrivate)
                  // eslint-disable-next-line arrow-body-style
                  .map((header, index) => {
                    return (
                      <Th
                        key={header.id}
                        height={headerHeight}
                        width={header.getSize()}
                        minWidth={header.column.columnDef.minSize}
                        maxWidth={header.column.columnDef.maxSize}
                        isSorted={header.column.getIsSorted()}
                        pinned={header?.column.columnDef.meta?.pinned}
                        index={index}
                        {...(header.column.columnDef.meta?.headerProps || {})}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        {header.column.columnDef.enableResizing && (
                          <Resizer table={tableInstance} header={header} />
                        )}
                      </Th>
                    );
                  })}
              </div>
            );
          })}
        </div>
        <Body height={totalSize} verticalPadding={rowHeight * 2 - 8 - 16}>
          <div tw="absolute z-0 top-0 left-0 right-0 bottom-0">
            {rows.map((row) => (
              <div
                key={`fake-${row.original.id}`}
                style={{ height: rowHeight }}
                tw="flex flex-row"
              >
                {row
                  .getVisibleCells()
                  .filter((cell) => !cell.column.columnDef.meta?.isPrivate)
                  .map((cell, index) => (
                    <div
                      tw="border-b border-r border-opacity-50 p-4 flex[1 0 auto]"
                      style={{ width: cell.column.getSize() }}
                    >
                      <div tw="bg-gray-50 w-full h-full rounded" />
                    </div>
                  ))}
              </div>
            ))}
          </div>
          {/* {paddingTop > 0 && <div style={{ height: `${paddingTop}px` }} />} */}
          {virtualRows.map(({ size, start, index, key }) => (
            <Row key={key} size={size} start={start} index={index} />
          ))}
          {/* {paddingBottom > 0 && (
            <div style={{ height: `${paddingBottom}px` }} />
          )} */}
        </Body>
        {includeFooter ? (
          <Footer footerGroups={footerGroups} rowHeight={rowHeight} />
        ) : null}
      </div>
      {/* </div> */}
    </div>
  );
}

export default Table;
