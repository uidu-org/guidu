import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { CellContext, flexRender, Row as RowType } from '@tanstack/react-table';
import { useDataManagerContext } from '@uidu/data-manager';
import React, { useCallback, useRef } from 'react';
import { StyledComponent } from 'styled-components';
import ContextMenu from './ContextMenu';

function Row<T extends object>({
  components,
  rowHeight,
  row,
  onItemClick,
  size,
  start,
}: {
  components: {
    StyledRow: StyledComponent<any, {}>;
    Td: StyledComponent<any, {}>;
  };
  rowHeight: number;
  onItemClick: (row: T) => void;
  row: RowType<T>;
  size: number;
  start: number;
}) {
  const rowRef = useRef(null);
  const { StyledRow, Td } = components;

  let ContextMenuComponent = null;
  const dataManagerContext = useDataManagerContext();
  if (dataManagerContext) {
    ContextMenuComponent = dataManagerContext?.contextMenu;
  }

  const renderCell = useCallback(
    (cell: CellContext<T, unknown>) => {
      if (cell.cell.getIsGrouped()) {
        const { getToggleExpandedHandler } = row;
        const toggleExpandedHandler = getToggleExpandedHandler();
        return (
          <div tw="flex items-center flex-grow justify-between min-w-0 min-h-0">
            <div tw="flex flex-grow items-center space-x-2 min-w-0 min-h-0">
              <button
                type="button"
                tw="flex-shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleExpandedHandler();
                }}
              >
                {row.getIsExpanded() ? (
                  <ChevronDownIcon tw="h-4 w-4" />
                ) : (
                  <ChevronRightIcon tw="h-4 w-4" />
                )}
              </button>
              {flexRender(cell.column.columnDef.cell, cell)}
            </div>
            <div tw="ml-2">({row.subRows.length})</div>
          </div>
        );
      }

      if (cell.cell.getIsAggregated()) {
        return flexRender(
          cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
          cell,
        );
      }

      if (cell.cell.getIsPlaceholder()) {
        return null;
      }

      return flexRender(cell.column.columnDef.cell, cell);
    },
    [row],
  );

  return (
    <StyledRow
      ref={rowRef}
      $size={size}
      $start={start}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        onItemClick(row.original);
      }}
    >
      {rowRef.current && ContextMenuComponent && (
        <ContextMenu targetRef={rowRef}>
          {({ show, setShow }) => (
            <ContextMenuComponent row={row} show={show} setShow={setShow} />
          )}
        </ContextMenu>
      )}
      {row
        .getVisibleCells()
        .filter((cell) => !cell.column.columnDef.meta?.isPrivate)
        .map((cell, index) => (
          <Td
            key={cell.id}
            $width={cell.column.getSize()}
            $minWidth={cell.column.columnDef.minSize}
            $maxWidth={cell.column.columnDef.maxSize}
            $isSorted={cell.column.getIsSorted()}
            $pinned={cell.column.columnDef.meta?.pinned}
            $index={index}
            $height={rowHeight}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(cell.column.columnDef.meta.cellProps || {})}
          >
            {renderCell(cell.getContext())}
          </Td>
        ))}
    </StyledRow>
  );
}

export default Row;
