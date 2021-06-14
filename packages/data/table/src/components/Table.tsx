/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useVirtual } from 'react-virtual';
import styled, { css } from 'styled-components';
import tw, { theme } from 'twin.macro';
import Footer from './Footer';
import Resizer from './Resizer';

const Body = styled.div<{ height: number; verticalPadding: number }>`
  height: ${({ height }) => `${height}px`};
  min-height: ${({ verticalPadding }) => `calc(100% - ${verticalPadding}px)`};
  background: var(--body-bg);
`;

function getPinnedStyled({ pinned = 'left', index }) {
  if (pinned === 'left') {
    return css`
      left: ${index === 0 ? 0 : '56px'};
      background: var(--body-bg);
      ${tw`border-r border-gray-200 border-opacity-50 z-10 sticky!`}
    `;
  }
  if (pinned === 'right') {
    return css`
      right: ${index === 0 ? 0 : 0};
      background: var(--body-bg);
      ${tw`border-l border-gray-200 border-opacity-50 z-10 sticky!`}
    `;
  }
}

const Td = styled.div<{ height: number; pinned?: string; index: number }>`
  height: ${({ height }) => `${height}px`};
  font-size: 0.95rem;
  background: var(--body-bg);

  ${({ pinned, index }) =>
    !!pinned ? getPinnedStyled({ pinned, index }) : null};
`;

const Th = styled.div<{ height: number; pinned?: string; index: number }>`
  height: ${({ height }) => `${height}px`};
  background: var(--body-bg);

  ${({ pinned, index }) =>
    !!pinned ? getPinnedStyled({ pinned, index }) : null};
`;

const StyledRow = styled.div<{ size: number; start: number }>`
  height: ${({ size }) => `${size}px`};
  transform: ${({ start }) => `translateY(${start}px)`};

  &:hover {
    ${Th}, ${Td} {
      background: ${theme`colors.gray.100`};
    }
  }
`;

const Table = ({
  setAggregation,
  setColumnWidth,
  includeFooter = true,
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
          tw="absolute top-0 left-0 cursor-pointer"
          {...row.getRowProps([{ style: { minWidth: '100%' } }])}
          size={size}
          start={start}
          onClick={(e) => {
            e.preventDefault();
            onItemClick(row);
          }}
        >
          {row.cells
            .filter((cell) => !cell.column.isPrivate)
            .map((cell, index) => (
              <Td
                tw="px-4 flex items-center border-b border-r border-gray-200 border-opacity-50 whitespace-nowrap"
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
    <div tw="h-full" role="table">
      <div
        {...getTableBodyProps()}
        ref={parentRef}
        tw="h-full w-full overflow-auto"
      >
        <div tw="bg-gray-50 flex items-center flex-col min-w-full top-0 sticky z-10 w-max">
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
                    tw="relative flex items-center px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-r border-gray-200 border-opacity-50 whitespace-nowrap"
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
          tw="w-full relative"
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
};

export default Table;
