/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { useVirtual } from 'react-virtual';
import styled, { css } from 'styled-components';

const Td = styled.div<{ height: number }>`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  white-space: nowrap;
  height: ${({ height }) => `${height}px`};
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f3;
  ${({ pinned }) =>
    pinned
      ? css`
          position: sticky;
          left: 0;
          z-index: 1;
          background: #fff;
          border-right: 1px solid #f2f2f3;
        `
      : null}
`;

const Th = styled.div<{ height: number }>`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  white-space: nowrap;
  height: ${({ height }) => `${height - 8}px`};
  font-size: 0.9375rem;
  border-bottom: 1px solid #f2f2f3;
  display: flex;
  align-items: center;
  font-weight: 500;
  position: relative;
`;

const Table = ({
  theme = 'uidu',
  setAggregation,
  columnDefs,
  rowData,
  onAddField = () => {},
  rowHeight = 32,
  groupRowHeightIncrementRatio = 1.2,
  tableInstance,
  ...otherProps
}) => {
  const [scrolled, setScrolled] = useState({ left: 0, top: 0 });

  let className = '';
  if (scrolled.left > 0) {
    className += ' ag-scrolled-left';
  }
  if (scrolled.top > 0) {
    className += ' ag-scrolled-top';
  }

  const { getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell) => {
            return (
              <Td
                {...cell.getCellProps()}
                height={rowHeight}
                className={
                  cell.column.isSorted ? 'ag-cell-sorter-active' : null
                }
              >
                {cell.isGrouped ? (
                  // If it's a grouped cell, add an expander and row count
                  <>
                    <span {...row.getToggleRowExpandedProps()}>
                      {row.isExpanded ? '👇' : '👉'}
                    </span>{' '}
                    {cell.render('Cell')} ({row.subRows.length})
                  </>
                ) : cell.isAggregated ? (
                  // If the cell is aggregated, use the Aggregated
                  // renderer for cell
                  cell.render('Aggregated')
                ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                  // Otherwise, just render the regular cell
                  cell.render('Cell')
                )}
              </Td>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows, rowHeight],
  );

  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
    overscan: 5,
    estimateSize: React.useCallback((i) => 56, []),
  });

  return (
    <div
      className={`ag-theme-${theme} h-100${className} border rounded`}
      role="table"
    >
      <div
        {...getTableBodyProps()}
        ref={parentRef}
        className="List"
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
      >
        <div
          className="header"
          style={{
            position: 'sticky',
            top: 0,
            background: 'white',
            width: 'fit-content',
            display: 'flex',
            alignItems: 'center',
            zIndex: 40,
          }}
        >
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps()}
                  className={column.isSorted ? 'ag-cell-sorter-active' : null}
                  height={rowHeight}
                  pinned={index === 0}
                  style={{
                    width: column.width,
                    ...(index === 0
                      ? {
                          position: 'sticky',
                          left: 0,
                          zIndex: 2,
                          background: '#fff',
                          borderRight: '1px solid #f2f2f3',
                        }
                      : {}),
                  }}
                >
                  {column.render('Header')}
                  {/* {!!column.getResizerProps && (
                    <div
                      {...column.getResizerProps({
                        style: {
                          display: 'inline-block',
                          background: 'blue',
                          width: '2px',
                          height: '100%',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          transform: 'translateX(50%)',
                          zIndex: 1,
                        },
                      })}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                  )} */}
                </Th>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const row = rows[virtualRow.index];
            prepareRow(row);
            return (
              <div
                key={virtualRow.index}
                {...row.getRowProps({
                  style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    // width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  },
                })}
                className="tr"
              >
                {row.cells.map((cell, index) => (
                  <Td
                    {...cell.getCellProps()}
                    pinned={index === 0}
                    height={rowHeight}
                    className={
                      cell.column.isSorted ? 'ag-cell-sorter-active' : null
                    }
                  >
                    <div className="text-truncate w-100">
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? '👇' : '👉'}
                          </span>{' '}
                          {cell.render('Cell')} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated', {
                          setAggregation,
                        })
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                    </div>
                  </Td>
                ))}
              </div>
            );
          })}
        </div>
        {/* <div
          style={{
            position: 'sticky',
            bottom: 0,
            background: 'red',
            width: 'fit-content',
          }}
        >
          {footerGroups.map((group) => (
            <tr {...group.getFooterGroupProps()}>
              {group.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
            </tr>
          ))}
        </div> */}
      </div>
      {/* <div {...getTableBodyProps()}>
        <FixedSizeList
          useIsScrolling
          height={400}
          itemCount={rows.length}
          itemSize={rowHeight}
          width={totalColumnsWidth}
        >
          {RenderRow}
        </FixedSizeList>
      </div> */}
    </div>
  );

  // return (
  //   <div className={`ag-theme-${theme} h-100${className}`}>
  //     <AgGridReact
  //       suppressMaxRenderedRowRestriction
  //       modules={[
  //         ClientSideRowModelModule,
  //         RowGroupingModule,
  //         MenuModule,
  //         CsvExportModule,
  //         StatusBarModule,
  //         RangeSelectionModule,
  //       ]}
  //       // ref={innerRef}
  //       // enterprise features
  //       // groupDefaultExpanded={-1}
  //       // groupUseEntireRow
  //       // groupIncludeFooter
  //       groupSuppressBlankHeader
  //       // suppressAggFuncInHeader
  //       groupSuppressAutoColumn
  //       // community features
  //       componentWrappingElement="span"
  //       // defaultGroupSortComparator={(valueA, valueB) => {
  //       //   console.log(valueA);
  //       //   if (valueA === null) {
  //       //     return -1;
  //       //   }
  //       //   if (valueB === null) {
  //       //     return 1;
  //       //   }

  //       //   console.log(valueA);

  //       //   return +valueA.momentObj - +valueB.momentObj;
  //       // }}
  //       columnDefs={columnDefs.map((columnDef) => ({
  //         ...columnDef,
  //         cellStyle: (params) => {
  //           return {
  //             ...columnDef.cellStyle,
  //             // account for borders
  //             lineHeight: `${
  //               params.node.group
  //                 ? rowHeight * groupRowHeightIncrementRatio - 2
  //                 : rowHeight - 2
  //             }px`,
  //           };
  //         },
  //         cellClassRules: {
  //           ...columnDef.cellClassRules,
  //           'ag-cell-sorter-active': (params) => {
  //             return params.columnApi
  //               .getColumnState()
  //               .filter((s) => !!s.sort)
  //               .map((s) => s.colId)
  //               .includes(params.colDef.colId);
  //           },
  //           'ag-cell-filter-active': (params) => {
  //             return Object.keys(params.api.getFilterModel()).includes(
  //               params.colDef.colId,
  //             );
  //           },
  //           'ag-cell-grouper-active': (params) => {
  //             return params.columnApi
  //               .getRowGroupColumns()
  //               .map((g) => g.colId)
  //               .includes(params.colDef.colId);
  //           },
  //         },
  //       }))}
  //       rowData={rowData}
  //       animateRows
  //       enableCellChangeFlash
  //       suppressContextMenu
  //       getMainMenuItems={getMainMenuItems}
  //       getRowHeight={(params) => {
  //         if (params.node.group) {
  //           return rowHeight * groupRowHeightIncrementRatio;
  //         } else {
  //           return rowHeight;
  //         }
  //       }}
  //       defaultColDef={{
  //         resizable: true,
  //         sortable: true,
  //         editable: false,
  //         suppressMenu: false,
  //         headerComponentFramework: CustomHeader,
  //         minWidth: 140,
  //       }}
  //       columnTypes={{
  //         avatar: {},
  //         addField: {},
  //         address: {},
  //         attachments: {},
  //         checkbox: {},
  //         contact: {},
  //         country: {},
  //         cover: {},
  //         currency: {},
  //         date: {},
  //         default: {},
  //         email: {},
  //         linkRecord: {},
  //         member: {},
  //         multipleSelect: {},
  //         number: {},
  //         paymentMethod: {},
  //         percent: {},
  //         phone: {},
  //         primary: {},
  //         progress: {},
  //         rating: {},
  //         singleSelect: {},
  //         string: {},
  //         text: {},
  //         uid: {},
  //         url: {},
  //         vote: {},
  //       }}
  //       rowHeight={rowHeight}
  //       onBodyScroll={({ left, top }) => setScrolled({ left, top })}
  //       {...otherProps}
  //     />
  //   </div>
  // );
};

export default Table;
