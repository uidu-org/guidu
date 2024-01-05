/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import { useDataManagerContext } from '@uidu/data-manager';
import { ShellBody } from '@uidu/shell';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import * as defaultComponents from '../styled';
import { TableProps } from '../types';
import { getComponents } from '../utils';
import Footer from './Footer';
import Headers from './Headers';
import DefaultLoadingRow from './LoadingRow';
import DefaultLoadingSkeleton from './LoadingSkeleton';
import RowSingle from './Row';

const defaultOverrides = {};

function TableWrapper(props) {
  return <div {...props} />;
}
const MemoizedTableWrapper = React.memo(TableWrapper);

const TableHead = forwardRef(({ children }, ref) => (
  <div tw="z-50 sticky top-0" ref={ref}>
    {children}
  </div>
));

function TableRow({ item, ...props }) {
  return <div key={item.id} {...props} />;
}

const MemoizedTableRow = React.memo(TableRow, (prev, next) => {
  return prev.item === next.item;
});

const TableFoot = forwardRef(({ children }, ref) => (
  <div ref={ref} tw="z-50 sticky bottom-0">
    {children}
  </div>
));

function Table<T extends { id: string }>({
  // overrideable props
  includeFooter = true,
  rowHeight = 32,
  headerHeight = 48,
  virtualizerOptions,
  virtuosoOptions,
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
  const { setIsScrolling } = useDataManagerContext() || {
    isScrolling: false,
    setIsScrolling: () => {},
  };

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
    (index: number, row: (typeof rows)[0]) => {
      const isLoaderRow = hasNext && index > rows.length - 1;

      if (isLoaderRow) {
        return <LoadingRow components={rowComponents} />;
      }

      return (
        <RowSingle<T>
          row={row}
          rowHeight={rowHeight}
          components={rowComponents}
          onItemClick={onItemClick}
        />
      );
    },
    [rows, rowHeight, rowComponents, LoadingRow, hasNext, onItemClick],
  );

  // useEffect(() => {
  //   // This makes effect optional, if we passed in a loadNext function then it should trigger it when we scroll to the bottom
  //   if (!loadNext) {
  //     return;
  //   }

  //   const [lastItem] = [...virtualRows].reverse();

  //   if (!lastItem) {
  //     return;
  //   }

  //   if (
  //     lastItem.index >= rows.length - 1 &&
  //     hasNext &&
  //     !isLoadingNext &&
  //     !isPending
  //   ) {
  //     loadNext();
  //   }
  // }, [loadNext, hasNext, rows.length, virtualRows, isLoadingNext, isPending]);

  /**
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   */
  const columnSizeVars = useMemo(() => {
    const headers = tableInstance.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [columnSizingInfo]);

  const FixedHeader = useCallback(
    () => (
      <Headers
        headerGroups={headerGroups}
        components={headerComponents}
        headerHeight={headerHeight}
        columnSizingInfo={columnSizingInfo}
      />
    ),
    [columnSizingInfo, headerGroups, headerComponents, headerHeight],
  );

  const FixedFooter = useCallback(
    () => <Footer footerGroups={footerGroups} rowHeight={rowHeight} />,
    [footerGroups, rowHeight],
  );

  const TableBody = useCallback(
    (props) =>
      isPending ? (
        <LoadingSkeleton
          components={rowComponents}
          columns={tableInstance.getAllColumns()}
          count={50}
          rowHeight={rowHeight}
        />
      ) : (
        <Body {...bodyProps} {...props} />
      ),
    [
      isPending,
      rowComponents,
      tableInstance,
      rowHeight,
      bodyProps,
      LoadingSkeleton,
      Body,
    ],
  );

  const SuspendedScrollSeek = useCallback(({ height, index, context }) => {
    console.log(height);
    return (
      <div
        style={{
          height,
          padding: '8px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          style={{
            background: index % 2 ? 'blue' : 'green',
            // height: randomHeights[index % 10],
          }}
        ></div>
      </div>
      // <ScrollSeekPlaceholder
      //   components={rowComponents}
      //   columns={tableInstance.getAllColumns()}
      //   count={50}
      //   rowHeight={rowHeight}
      // />
    );
  }, []);

  const computeItemKey = useCallback((index: number) => rows[index].id, [rows]);

  return (
    <ShellBody
      tw="flex-col"
      style={{
        ...columnSizeVars,
      }}
    >
      <TableVirtuoso
        overscan={50}
        // isScrolling={setIsScrolling}
        data={rows}
        computeItemKey={computeItemKey}
        defaultItemHeight={rowHeight}
        fixedItemHeight={headerHeight}
        itemContent={Row}
        // followOutput
        // increaseViewportBy={800}
        fixedHeaderContent={FixedHeader}
        {...(includeFooter
          ? {
              fixedFooterContent: FixedFooter,
            }
          : {})}
        components={{
          Table: columnSizingInfo.isResizingColumn
            ? TableWrapper
            : MemoizedTableWrapper,
          TableHead,
          TableBody,
          TableRow: MemoizedTableRow,
          TableFoot,
          // ScrollSeekPlaceholder: SuspendedScrollSeek,
        }}
        // scrollSeekConfiguration={{
        //   enter: (velocity) => Math.abs(velocity) > 50,
        //   exit: (velocity) => {
        //     const shouldExit = Math.abs(velocity) < 10;
        //     // if (shouldExit) {
        //     //   setVisibleRange(['-', '-']);
        //     // }
        //     return shouldExit;
        //   },
        //   change: (_velocity, { startIndex, endIndex }) => {},
        //   // setVisibleRange([startIndex, endIndex]),
        // }}
        endReached={() => {
          if (hasNext && !isLoadingNext && !isPending) {
            loadNext();
          }
        }}
        {...virtuosoOptions}
      />
    </ShellBody>
  );
}

export default Table;
