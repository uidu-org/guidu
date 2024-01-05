import { Column } from '@tanstack/react-table';
import React from 'react';

export type LoadingSkeletonProps<T> = {
  columns: Column<T>[];
  count: number;
  rowHeight: number;
};

export function ScrollSeekPlaceholder({
  columns,
  i,
  rowHeight,
  components,
  ...rest
}: {
  columns: Column<any>[];
  i: number;
  rowHeight: number;
  components: any;
}) {
  const { StyledRow, Td } = components;

  return (
    <div
      key={`fake-${i}`}
      style={{ height: rowHeight }}
      tw="flex flex-row items-center min-w-full"
    >
      {columns
        .filter((column) => !column.columnDef.meta?.isPrivate)
        .map((column, index) => (
          <Td
            key={`${column.id}-fake-${i}`}
            // tw="border-b border-r border-opacity-50 p-4 flex[1 0 auto]"
            $width={column.getSize()}
            $minWidth={column.columnDef.minSize}
            $maxWidth={column.columnDef.maxSize}
            $isSorted={column.getIsSorted()}
            $pinned={column.columnDef.meta?.pinned}
            $index={index}
            $height={rowHeight}
            // style={{ width: column.getSize() }}
          >
            <div tw="bg-gray-100 w-full [height:30%] rounded" />
          </Td>
        ))}
    </div>
  );
}

export default function LoadingSkeleton<T extends { id: string }>({
  columns,
  count = 10,
  rowHeight,
  components,
}: LoadingSkeletonProps<T>) {
  const { StyledRow, Td } = components;

  return Array.from(Array(count).keys()).map((i) => (
    <ScrollSeekPlaceholder
      columns={columns}
      i={i}
      rowHeight={rowHeight}
      components={components}
    />
  ));
}
