import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import {
  Cell as CellType,
  CellContext,
  flexRender,
  Row,
} from '@tanstack/react-table';
import { useDataManagerContext } from '@uidu/data-manager';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyledComponent } from 'styled-components';
import { StyledTdProps } from '../styled';

export default function Cell<T, V>({
  row,
  components,
  cell,
  index,
  rowHeight,
}: {
  row: Row<T>;
  components: {
    Td: StyledComponent<'div', StyledTdProps, {}>;
  };
  cell: CellType<T, V>;
  index: number;
  rowHeight: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { Td } = components;

  const {
    selectedCell,
    setSelectedCell,
    onItemClick,
    editingCell,
    setEditingCell,
  } = useDataManagerContext() || {
    selectedCell: null,
    setSelectedCell: () => {},
    onItemClick: () => {},
    editingCell: null,
    setEditingCell: () => {},
  };

  const isEditing = useMemo(
    () => editingCell?.id === cell.id,
    [editingCell, cell.id],
  );

  const setEditing = useCallback(() => {
    if (cell.column.columnDef.meta?.enableEditing) {
      setEditingCell(cell);
    }
  }, [cell, setEditingCell]);

  const closeEditing = useCallback(() => {
    if (isEditing) {
      setEditingCell(null);
    }
  }, [isEditing, setEditingCell]);

  const renderCell = useCallback(
    (cellContext: CellContext<T, unknown>) => {
      if (cellContext.cell.getIsGrouped()) {
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
              {flexRender(cellContext.column.columnDef.cell, {
                ...cellContext,
                isEditing,
                closeEditing,
              })}
            </div>
            <div tw="ml-2">({row.subRows.length})</div>
          </div>
        );
      }

      if (cellContext.cell.getIsAggregated()) {
        return flexRender(
          cellContext.column.columnDef.aggregatedCell ??
            cellContext.column.columnDef.cell,
          {
            ...cellContext,
            isEditing,
            closeEditing,
          },
        );
      }

      if (cellContext.cell.getIsPlaceholder()) {
        return null;
      }

      return flexRender(cellContext.column.columnDef.cell, {
        ...cellContext,
        isEditing,
        closeEditing,
      });
    },
    [row, isEditing, closeEditing],
  );

  useEffect(() => {
    if (selectedCell === cell.id && ref.current) {
      ref.current.focus();
    }
  }, [selectedCell, cell.id]);

  return (
    <Td
      ref={ref}
      key={cell.id}
      $width={cell.column.getSize()}
      $minWidth={cell.column.columnDef.minSize}
      $maxWidth={cell.column.columnDef.maxSize}
      $isSorted={cell.column.getIsSorted()}
      $pinned={cell.column.columnDef.meta?.pinned}
      $index={index}
      $height={rowHeight}
      tabIndex={-1}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setEditing(cell);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          if (isEditing) {
            closeEditing();
          } else {
            setEditing(cell);
          }
        }
      }}
      onClick={(e) => {
        if (!onItemClick) {
          e.preventDefault();
          // e.stopPropagation();
          setSelectedCell(cell.id);
        }
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(cell.column.columnDef.meta.cellProps || {})}
    >
      {renderCell(cell.getContext())}
      {selectedCell === cell.id && (
        <div tw="absolute inset-0 bg-primary bg-opacity-5 rounded pointer-events-none" />
      )}
      {selectedCell === cell.id && (
        <div tw="absolute inset-0 border border-primary rounded -z-0 pointer-events-none" />
      )}
    </Td>
  );
}
