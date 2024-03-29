import React from 'react';

export type LoadingSkeletonProps<T> = {
  count: number;
  rowHeight: number;
  gutterSize: number;
};

export default function LoadingSkeleton<T extends { id: string }>({
  count = 50,
  rowHeight,
  gutterSize,
}: LoadingSkeletonProps<T>) {
  return (
    <div tw="absolute z-0 top-0 left-0 right-0 bottom-0">
      {Array.from(Array(count).keys()).map((i) => (
        <div
          key={`fake-${i}`}
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
