/* eslint-disable react/jsx-props-no-spreading */

import React, { useCallback } from 'react';
import { Row as RowType, TableInstance } from 'react-table';
import { useVirtual } from 'react-virtual';
import { theme } from 'twin.macro';
import * as defaultComponents from '../styled';
import Footer from './Footer';
import Resizer from './Resizer';

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
  tableInstance: TableInstance<T>;
  onItemClick: (row: RowType<T>) => void;
  overrides?: Record<string, any>;
}) {
  const { getTableBodyProps, headerGroups, page, prepareRow, footerGroups } =
    tableInstance;

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
      const row: RowType<T> = page[index];
      prepareRow(row);

      return (
        <StyledRow
          key={index}
          {...row.getRowProps([{ style: { minWidth: '100%' } }])}
          size={size}
          start={start}
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            onItemClick(row);
          }}
        >
          {row.cells
            .filter((cell) => !cell.column.isPrivate)
            .map((cell, index) => (
              <Td
                {...cell.getCellProps([
                  {
                    style: {
                      left: index === 0 ? 0 : '56px',
                      ...(cell.column.isSorted
                        ? { backgroundColor: theme`colors.yellow.50` }
                        : {}),
                      ...cell.column.cellStyle,
                    },
                  },
                ])}
                pinned={cell.column.pinned}
                index={index}
                height={rowHeight}
              >
                {cell.isGrouped ? (
                  // If it's a grouped cell, add an expander and row count
                  <>
                    <span {...row.getToggleRowExpandedProps()}>
                      {row.isExpanded ? '👇' : '👉'}
                    </span>{' '}
                    {cell.render('Cell', { ...cell.column.cellProps })} (
                    {row.subRows.length})
                  </>
                ) : cell.isAggregated ? (
                  // If the cell is aggregated, use the Aggregated
                  // renderer for cell
                  cell.render('Aggregated', {
                    setAggregation,
                  })
                ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                  // Otherwise, just render the regular cell
                  cell.render('Cell', { ...cell.column.cellProps })
                )}
              </Td>
            ))}
        </StyledRow>
      );
    },
    [page, prepareRow, rowHeight, setAggregation, onItemClick],
  );

  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: page.length,
    parentRef,
    overscan: 5,
    estimateSize: React.useCallback((i) => rowHeight, [rowHeight]),
  });

  return (
    <div tw="h-full" role="table">
      <div
        {...getTableBodyProps()}
        ref={parentRef}
        tw="h-full w-full overflow-auto"
      >
        <div tw="background[rgb(var(--body-on-primary-bg))] flex items-center flex-col min-w-full top-0 sticky z-10 w-max">
          {headerGroups.map((headerGroup) => (
            <div
              {...headerGroup.getHeaderGroupProps([
                { style: { minWidth: '100%' } },
              ])}
            >
              {headerGroup.headers
                .filter((column) => !column.isPrivate)
                .map((column, index) => (
                  <Th
                    height={headerHeight}
                    pinned={column.pinned}
                    index={index}
                    {...column.getHeaderProps([
                      {
                        style: {
                          ...column.style,
                          // width: column.width,
                          // maxWidth: column.maxWidth,
                          // minWidth: column.minWidth,
                          ...(column.isSorted
                            ? { backgroundColor: theme`colors.yellow.50` }
                            : {}),
                          ...column.headerStyle,
                        },
                      },
                    ])}
                  >
                    {column.render('Header', {
                      setColumnWidth,
                      getColumnWidth,
                      headerIcons,
                      autosizeAllColumns: () => {
                        // columns.map((column) => {
                        //   return setColumnWidth(column, getColumnWidth(column));
                        // });
                      },
                    })}
                    {!!column.getResizerProps && <Resizer column={column} />}
                  </Th>
                ))}
            </div>
          ))}
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
  );
}

export default Table;
