import {
  ColumnSizingInfoState,
  flexRender,
  HeaderGroup,
} from '@tanstack/react-table';
import React from 'react';
import Resizer from './Resizer';

export default function Headers<T>({
  headerGroups,
  components,
  headerHeight,
  columnSizingInfo,
}: {
  headerGroups: HeaderGroup<T>[];
  components: any;
  headerHeight: number;
  columnSizingInfo: ColumnSizingInfoState;
}) {
  const { Th } = components;
  return (
    <div tw="background[rgb(var(--body-on-primary-bg))] flex flex-col min-w-full top-0 sticky z-50 w-max">
      {headerGroups.map((headerGroup) => (
        <div tw="flex min-w-full" key={headerGroup.id}>
          {headerGroup.headers
            .filter((header) => !header.column.columnDef.meta?.isPrivate)
            // eslint-disable-next-line arrow-body-style
            .map((header, index) => {
              return (
                <Th
                  key={header.id}
                  $height={headerHeight}
                  $width={header.getSize()}
                  $minWidth={header.column.columnDef.minSize}
                  $maxWidth={header.column.columnDef.maxSize}
                  $isSorted={header.column.getIsSorted()}
                  $pinned={header?.column.columnDef.meta?.pinned}
                  $index={index}
                  {...(header.column.columnDef.meta?.headerProps || {})}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  {header.column.columnDef.enableResizing && (
                    <Resizer
                      columnSizingInfo={columnSizingInfo}
                      header={header}
                    />
                  )}
                </Th>
              );
            })}
        </div>
      ))}
    </div>
  );
}
