/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */

import { Row as RowType } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ScrollableContainer, ShellBody } from '@uidu/shell';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import * as defaultComponents from '../styled';
import { TableProps } from '../types';
import { getComponents } from '../utils';
import Footer from './Footer';
import Headers from './Headers';
import DefaultLoadingRow from './LoadingRow';
import DefaultLoadingSkeleton from './LoadingSkeleton';
import RowSingle from './Row';

const defaultOverrides = {};

function Table<T extends { id: string }>({
  // overrideable props
  includeFooter = true,
  rowHeight = 32,
  headerHeight = 48,
  virtualizerOptions,
  loadingRow: LoadingRow = DefaultLoadingRow,
  loadingSkeleton: LoadingSkeleton = DefaultLoadingSkeleton,
  //
  tableInstance,
  onItemClick,
  overrides = defaultOverrides,
  // pagination
  pagination,
  // pending
  isPending = false,
}: TableProps<T>) {
  const { getHeaderGroups, getFooterGroups, getRowModel, getState } =
    tableInstance;
  const { loadNext, isLoadingNext, hasNext } = pagination || {};

  const headerGroups = getHeaderGroups();
  const footerGroups = getFooterGroups();
  const { rows } = getRowModel();

  const { columnSizingInfo } = getState();

  const {
    Th: { component: Th, props: trProps },
    Td: { component: Td, props: tdProps },
    StyledRow: { component: StyledRow, props: rowProps },
    Body: { component: Body, props: bodyProps },
  } = useMemo(() => getComponents(defaultComponents, overrides), [overrides]);

  const headerComponents = useMemo(() => ({ Th }), [Th]);
  const rowComponents = useMemo(() => ({ Td, StyledRow }), [Td, StyledRow]);

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

      const isLoaderRow = hasNext && index > rows.length - 1;

      if (isLoaderRow) {
        return (
          <LoadingRow components={rowComponents} start={start} size={size} />
        );
      }

      return (
        <RowSingle<T>
          row={row}
          rowHeight={rowHeight}
          size={size}
          start={start}
          components={rowComponents}
          onItemClick={onItemClick}
        />
      );
    },
    [rows, rowHeight, rowComponents, LoadingRow, hasNext, onItemClick],
  );

  const parentRef = useRef<HTMLDivElement>();

  const rowVirtualizer = useVirtualizer({
    count: hasNext ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current,
    overscan: 20,
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

    if (
      lastItem.index >= rows.length - 1 &&
      hasNext &&
      !isLoadingNext &&
      !isPending
    ) {
      loadNext();
    }
  }, [loadNext, hasNext, rows.length, virtualRows, isLoadingNext, isPending]);

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <ShellBody tw="flex-col">
      <ScrollableContainer ref={parentRef} tw="h-full w-full overflow-scroll">
        <Headers
          headerGroups={headerGroups}
          components={headerComponents}
          headerHeight={headerHeight}
          columnSizingInfo={columnSizingInfo}
        />
        {/* <div
          style={{
            // width: tableInstance.getTotalSize(),
            minWidth: '100%',
          }}
          tw="h-full overflow-auto"
        > */}
        {/* Here we should insert the pagination fragment, and manage data  */}
        <Body $height={totalSize} $verticalPadding={headerHeight}>
          {/* {paddingTop > 0 && <div style={{ height: `${paddingTop}px` }} />} */}
          {isPending ? (
            <LoadingSkeleton
              components={rowComponents}
              columns={tableInstance.getAllColumns()}
              count={50}
              rowHeight={rowHeight}
            />
          ) : (
            virtualRows.map(({ size, start, index, key }) => (
              <Row key={key} size={size} start={start} index={index} />
            ))
          )}
          {/* {paddingBottom > 0 && (
            <div style={{ height: `${paddingBottom}px` }} />
          )} */}
        </Body>
      </ScrollableContainer>
      {includeFooter ? (
        <Footer footerGroups={footerGroups} rowHeight={rowHeight} />
      ) : null}
    </ShellBody>
  );
}

export default Table;
