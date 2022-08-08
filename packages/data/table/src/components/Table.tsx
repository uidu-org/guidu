/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */

import {
  flexRender,
  Row as RowType,
  Table as TableType,
} from '@tanstack/react-table';
import React, { useCallback } from 'react';
import { useVirtual } from 'react-virtual';
import * as defaultComponents from '../styled';
import Footer from './Footer';
import Resizer from './Resizer';
import RowSingle from './Row';

function getComponents(defaultComponents, overrides = {}) {
  return Object.keys(defaultComponents).reduce((acc, name) => {
    const override = overrides[name] || {};
    acc[name] = {
      component: override.component || defaultComponents[name],
      props: { $style: override.style, ...override.props },
    };
    return acc;
  }, {});
}

function Table<T extends object>({
  setAggregation,
  setColumnWidth,
  includeFooter = true,
  rowHeight = 32,
  headerHeight = 48,
  headerIcons = true,
  groupRowHeightIncrementRatio = 1.2,
  tableInstance,
  onItemClick,
  overrides = {},
}: {
  setAggregation: (aggregation: string) => void;
  setColumnWidth: (column: string, width: number) => void;
  includeFooter?: boolean;
  rowHeight?: number;
  headerHeight?: number;
  headerIcons?: boolean;
  groupRowHeightIncrementRatio?: number;
  tableInstance: TableType<T>;
  onItemClick: (row: T) => void;
  overrides?: Record<string, any>;
}) {
  const { getHeaderGroups, getFooterGroups, getRowModel } = tableInstance;

  const headerGroups = getHeaderGroups();
  const footerGroups = getFooterGroups();
  const { rows } = getRowModel();

  // const getColumnWidth = (data, accessor, headerText) => {
  //   const cellLength = Math.max(
  //     ...data.map((row) => {
  //       let value = '';

  //       if (typeof accessor === 'string') {
  //         value = _.get(row, accessor);
  //       } else {
  //         value = accessor(row);
  //       }

  //       if (typeof value === 'number') return value.toString().length;
  //       return (value || '').length;
  //     }),
  //     headerText.length,
  //   );

  //   const magicSpacing = 12;
  //   return cellLength * magicSpacing;
  // };

  const {
    Th: { component: Th, props: trProps },
    Td: { component: Td, props: tdProps },
    StyledRow: { component: StyledRow, props: rowProps },
    Body: { component: Body, props: bodyProps },
  } = getComponents(defaultComponents, overrides) as any;

  const getColumnWidth = ({ id: accessor, name }) => {
    let max = 0;

    const maxWidth = 400;
    const magicSpacing = 18;

    for (var i = 0; i < page.length; i++) {
      if (page[i] !== undefined && page[i].original[accessor] !== null) {
        if ((page[i].original[accessor] || 'null').length > max) {
          max = (page[i].original[accessor] || 'null').length;
        }
      }
    }

    return Math.min(maxWidth, Math.max(max, name.length) * magicSpacing);
  };

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

      return (
        <RowSingle<T>
          row={row}
          rowHeight={rowHeight}
          size={size}
          start={start}
          components={{ Td, StyledRow }}
          onItemClick={onItemClick}
          setAggregation={setAggregation}
        />
      );
    },
    [rows, rowHeight, setAggregation, onItemClick, StyledRow, Td],
  );

  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
    overscan: 5,
    estimateSize: React.useCallback((i) => rowHeight, [rowHeight]),
  });

  return (
    <div tw="h-full" role="table">
      <div ref={parentRef} tw="h-full w-full overflow-auto">
        <div
        // style={{
        //   width: tableInstance.getTotalSize(),
        // }}
        >
          <div tw="background[rgb(var(--body-on-primary-bg))] flex flex-col min-w-full top-0 sticky z-10 w-max">
            {headerGroups.map((headerGroup) => {
              return (
                <div tw="flex min-w-full" key={headerGroup.id}>
                  {headerGroup.headers
                    .filter(
                      (header) => !header.column.columnDef.meta?.isPrivate,
                    )
                    // eslint-disable-next-line arrow-body-style
                    .map((header, index) => {
                      return (
                        <Th
                          key={header.id}
                          height={headerHeight}
                          width={header.getSize()}
                          isSorted={header.column.getIsSorted()}
                          pinned={header?.column.columnDef.meta?.pinned}
                          index={index}
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
          <Body
            height={rowVirtualizer.totalSize}
            verticalPadding={rowHeight * 2 - 8 - 16}
          >
            {rowVirtualizer.virtualItems.map(({ size, start, index }) => (
              <Row key={index} size={size} start={start} index={index} />
            ))}
          </Body>
          {includeFooter ? (
            <Footer footerGroups={footerGroups} rowHeight={rowHeight} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Table;
