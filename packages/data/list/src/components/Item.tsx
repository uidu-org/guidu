import { flexRender, Row } from '@tanstack/react-table';
import React from 'react';
import { StyledCell, StyledItem } from '../styled';

export default function Item<T>({
  row,
  gutterSize = 32,
  onItemClick,
  style = {},
}: {
  row: Row<T>;
  gutterSize?: number;
  onItemClick?: (item: T) => void;
  style?: React.CSSProperties;
}) {
  const item = row.original;
  const primary = row
    .getVisibleCells()
    .find((cell) => cell.column.columnDef.meta?.isPrimary);
  const cover = row
    .getVisibleCells()
    .find((cell) => cell.column.columnDef.meta?.kind === 'cover');
  const uid = row
    .getVisibleCells()
    .find((cell) => cell.column.columnDef.meta?.kind === 'uid');

  return (
    <StyledItem
      $gutterSize={gutterSize}
      key={row.id}
      onClick={(e) => {
        e.preventDefault();
        onItemClick(item);
      }}
      tw="top-0 flex items-center w-auto"
    >
      {uid && (
        <div tw="truncate px-4 h-full border-r">
          {flexRender(uid.column.columnDef.cell, uid.getContext())}
        </div>
      )}
      {cover && (
        <div
          tw="h-full flex-shrink-0 bg-center bg-cover bg-red-200"
          style={{
            width: cover.column.getSize() || '138px',
            backgroundImage: `url(${cover.getValue() as string})`,
          }}
        />
      )}
      <div tw="flex flex-col">
        {primary && (
          <div tw="sticky width[fit-content] -left-4 px-4 font-medium max-width[calc(100vw - 100px)]">
            {flexRender(primary.column.columnDef.cell, primary.getContext())}
          </div>
        )}
        <div tw="flex items-center">
          {row
            .getVisibleCells()
            .filter(
              (cell) =>
                cell.column.columnDef.meta?.kind !== 'uid' &&
                !cell.column.columnDef.meta?.isPrivate &&
                !cell.column.columnDef.meta?.isPrimary,
            )
            .map((cell) => (
              <StyledCell
                key={cell.id}
                $size={cell.column.getSize()}
                $minSize={cell.column.columnDef.minSize}
                $maxSize={cell.column.columnDef.maxSize}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </StyledCell>
            ))}
        </div>
      </div>
    </StyledItem>
  );
}
