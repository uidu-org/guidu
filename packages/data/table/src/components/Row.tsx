import { Row as RowType } from '@tanstack/react-table';
import { useDataManagerContext } from '@uidu/data-manager';
import React, { useMemo, useRef } from 'react';
import { StyledComponent } from 'styled-components';
import Cell from './Cell';
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

  const visibleCells = useMemo(
    () =>
      row
        .getVisibleCells()
        .filter((cell) => !cell.column.columnDef.meta?.isPrivate),
    [row],
  );

  return (
    <StyledRow
      ref={rowRef}
      $size={size}
      $start={start}
      $onItemClick={!!onItemClick}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(onItemClick
        ? {
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              onItemClick(row.original);
            },
          }
        : {})}
    >
      {rowRef.current && ContextMenuComponent && (
        <ContextMenu targetRef={rowRef}>
          {({ show, setShow }) => (
            <ContextMenuComponent row={row} show={show} setShow={setShow} />
          )}
        </ContextMenu>
      )}
      {visibleCells.map((cell, index) => (
        <Cell<T, unknown>
          key={cell.id}
          row={row}
          index={index}
          rowHeight={rowHeight}
          cell={cell}
          components={{ Td }}
        />
      ))}
    </StyledRow>
  );
}

export default Row;
