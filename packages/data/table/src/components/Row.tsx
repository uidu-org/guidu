import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React from 'react';
import { Cell, Row as RowType } from 'react-table';
import { StyledComponent } from 'styled-components';
import { theme } from 'twin.macro';

export default function Row<T extends object>({
  components,
  rowHeight,
  row,
  onItemClick,
  size,
  start,
  setAggregation,
}: {
  components: {
    StyledRow: StyledComponent<any, {}>;
    Td: StyledComponent<any, {}>;
  };
  rowHeight: number;
  onItemClick: (row: RowType<T>) => void;
  row: RowType<T>;
  size: number;
  start: number;
  setAggregation: (aggregation: string) => void;
}) {
  const { StyledRow, Td } = components;

  const renderCell = (cell: Cell<T>) => {
    if (cell.isGrouped) {
      return (
        <div tw="flex items-center flex-grow justify-between min-w-0 min-h-0">
          <div tw="flex flex-grow items-center space-x-2 min-w-0 min-h-0">
            <span
              tw="flex-shrink-0"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...row.getToggleRowExpandedProps()}
            >
              {row.isExpanded ? (
                <ChevronDownIcon tw="h-4 w-4" />
              ) : (
                <ChevronRightIcon tw="h-4 w-4" />
              )}
            </span>
            {cell.render('Cell', { ...cell.column.cellProps })}
          </div>
          <div tw="ml-2">({row.subRows.length})</div>
        </div>
      );
    }

    if (cell.isAggregated) {
      return cell.render('Aggregated', {
        setAggregation,
      });
    }

    if (cell.isPlaceholder) {
      return null;
    }

    return cell.render('Cell', { ...cell.column.cellProps });
  };

  return (
    <StyledRow
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...row.getRowProps([{ style: { minWidth: '100%' } }])}
      size={size}
      start={start}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        onItemClick(row);
      }}
      // onContextMenu={(e: React.MouseEvent) => {
      //   console.log(e);
      //   e.preventDefault();
      //   // show actions in Popup
      // }}
    >
      {row.cells
        .filter((cell) => !cell.column.isPrivate)
        .map((cell, index) => (
          <Td
            // eslint-disable-next-line react/jsx-props-no-spreading
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
            {renderCell(cell)}
          </Td>
        ))}
    </StyledRow>
  );
}
