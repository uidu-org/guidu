/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useVirtual } from 'react-virtual';
import styled, { css } from 'styled-components';
import Footer from './Footer';
import Resizer from './Resizer';

const Body = styled.div<{ height: number; verticalPadding: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ verticalPadding }) => `calc(100% - ${verticalPadding}px)`};
  width: 100%;
  position: relative;
  background: white;
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  background: white;
  width: fit-content;
  display: flex;
  align-items: center;
  z-index: 1;
`;

function getPinnedStyled({ pinned = 'left', index }) {
  if (pinned === 'left') {
    return css`
      position: sticky;
      left: ${index === 0 ? 0 : '56px'};
      z-index: 2;
      background: var(--body-bg);
      border-right: 1px solid #f2f2f3;
    `;
  }
  if (pinned === 'right') {
    return css`
      position: sticky;
      right: ${index === 0 ? 0 : 0};
      z-index: 2;
      background: var(--body-bg);
      border-left: 1px solid #f2f2f3;
    `;
  }
}

const Td = styled.div<{ height: number; pinned?: string; index: number }>`
  padding-left: 1rem;
  padding-right: 1rem;
  white-space: nowrap;
  height: ${({ height }) => `${height}px`};
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f2f2f3;
  border-right: 1px solid #f2f2f3;
  background: var(--body-bg);

  ${({ pinned, index }) =>
    !!pinned ? getPinnedStyled({ pinned, index }) : null};
`;

const Th = styled.div<{ height: number; pinned?: string; index: number }>`
  padding-left: 1rem;
  padding-right: 1rem;
  white-space: nowrap;
  height: ${({ height }) => `${height}px`};
  font-size: 0.95rem;
  border-bottom: 1px solid #f2f2f3;
  border-right: 1px solid #f2f2f3;
  display: flex;
  align-items: center;
  /* font-weight: 500; */
  position: relative;
  background: var(--body-bg);

  ${({ pinned, index }) =>
    !!pinned ? getPinnedStyled({ pinned, index }) : null};
`;

const StyledRow = styled.div<{ size: number; start: number }>`
  position: absolute;
  top: 0;
  left: 0;
  // width: '100%';
  height: ${({ size }) => `${size}px`};
  transform: ${({ start }) => `translateY(${start}px)`};
  cursor: pointer;

  &:hover {
    ${Th}, ${Td} {
      background: var(--light) !important;
    }
  }
`;

const Table = ({
  theme = 'uidu',
  setAggregation,
  setColumnWidth,
  rowHeight = 32,
  headerHeight = 48,
  headerIcons = true,
  groupRowHeightIncrementRatio = 1.2,
  tableInstance,
  onItemClick,
}) => {
  const {
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    columns,
  } = tableInstance;

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

  const getColumnWidth = ({ id: accessor, name }) => {
    let max = 0;

    const maxWidth = 400;
    const magicSpacing = 18;

    for (var i = 0; i < rows.length; i++) {
      if (rows[i] !== undefined && rows[i].original[accessor] !== null) {
        if ((rows[i].original[accessor] || 'null').length > max) {
          max = (rows[i].original[accessor] || 'null').length;
        }
      }
    }

    return Math.min(maxWidth, Math.max(max, name.length) * magicSpacing);
  };

  const Row = React.useCallback(
    ({ index, size, start }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <StyledRow
          key={index}
          {...row.getRowProps()}
          size={size}
          start={start}
          onClick={(e) => {
            e.preventDefault();
            onItemClick(row);
          }}
        >
          {row.cells
            .filter(
              (cell) =>
                cell.column.kind !== 'cover' && cell.column.kind !== 'avatar',
            )
            .map((cell, index) => (
              <Td
                {...cell.getCellProps({
                  style: {
                    left: index === 0 ? 0 : '56px',
                    ...(cell.column.isSorted
                      ? { backgroundColor: 'rgba(254, 226, 213, 0.25)' }
                      : {}),
                    ...cell.column.cellStyle,
                  },
                })}
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
    [rows, prepareRow, rowHeight, setAggregation, onItemClick],
  );

  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: rows.length,
    parentRef,
    overscan: 5,
    estimateSize: React.useCallback((i) => rowHeight, [rowHeight]),
  });

  return (
    <div className={`ag-theme-${theme} h-100`} role="table">
      <div
        {...getTableBodyProps()}
        ref={parentRef}
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
        }}
      >
        <Header>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers
                .filter(
                  (column) =>
                    column.kind !== 'cover' && column.kind !== 'avatar',
                )
                .map((column, index) => (
                  <Th
                    {...column.getHeaderProps()}
                    height={headerHeight}
                    pinned={column.pinned}
                    index={index}
                    style={{
                      width: column.width,
                      maxWidth: column.maxWidth,
                      minWidth: column.minWidth,
                      ...(column.isSorted
                        ? { backgroundColor: 'rgba(254, 226, 213, 0.25)' }
                        : {}),
                    }}
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
        </Header>
        <Body
          height={rowVirtualizer.totalSize}
          verticalPadding={rowHeight * 2 - 8 - 16}
        >
          {rowVirtualizer.virtualItems.map(({ size, start, index }) => (
            <Row key={index} size={size} start={start} index={index} />
          ))}
        </Body>
        <Footer footerGroups={footerGroups} rowHeight={rowHeight} />
      </div>
    </div>
  );
};

export default Table;
