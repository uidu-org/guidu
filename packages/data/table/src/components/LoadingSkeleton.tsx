import { Row } from '@tanstack/react-table';
import React from 'react';

export type LoadingSkeletonProps<T> = {
  rows: Row<T>[];
  rowHeight: number;
};

export default function LoadingSkeleton<T extends { id: string }>({
  rows,
  rowHeight,
}: LoadingSkeletonProps<T>) {
  return (
    <div tw="absolute z-0 top-0 left-0 right-0 bottom-0">
      {rows.map((row) => (
        <div
          key={`fake-${row.original.id}`}
          style={{ height: rowHeight }}
          tw="flex flex-row"
        >
          {row
            .getVisibleCells()
            .filter((cell) => !cell.column.columnDef.meta?.isPrivate)
            .map((cell) => (
              <div
                tw="border-b border-r border-opacity-50 p-4 flex[1 0 auto]"
                style={{ width: cell.column.getSize() }}
              >
                <div tw="bg-gray-50 w-full h-full rounded" />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
