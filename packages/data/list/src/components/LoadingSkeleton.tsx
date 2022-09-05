import { Row } from '@tanstack/react-table';
import React from 'react';

export type LoadingSkeletonProps<T> = {
  rows: Row<T>[];
  rowHeight: number;
  gutterSize: number;
};

export default function LoadingSkeleton<T extends { id: string }>({
  rows,
  rowHeight,
  gutterSize,
}: LoadingSkeletonProps<T>) {
  return (
    <div tw="absolute z-0 top-0 left-0 right-0 bottom-0">
      {rows.map((row) => (
        <div
          key={`fake-${row.original.id}`}
          style={{
            height: rowHeight - gutterSize,
            margin: `${gutterSize}px 0`,
          }}
          tw="flex flex-row bg-gray-50 rounded"
        />
      ))}
    </div>
  );
}
