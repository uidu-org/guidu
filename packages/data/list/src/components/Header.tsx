import { flexRender, HeaderGroup } from '@tanstack/react-table';
import React from 'react';

export default function Header<T>({
  headerGroups,
  style = {},
}: {
  headerGroups: HeaderGroup<T>[];
  style?: React.CSSProperties;
}) {
  const cover = null;
  return (
    <>
      {headerGroups.map((headerGroup) => (
        <div
          style={{
            ...style,
            height: style.height || 48,
            fontSize: '14px',
            fontWeight: 500,
            zIndex: 20,
          }}
          tw="sticky top-0 flex items-center background[rgb(var(--body-on-primary-bg))] min-w-full width[fit-content] border-b px-4 -mx-4"
        >
          {cover && (
            <div
              tw="truncate flex items-center px-3 xl:px-4 h-full bg-transparent flex-shrink-0"
              style={{
                width: cover.width || '138px',
              }}
            >
              <span tw="mr-2.5 opacity-40">{cover.icon}</span>
              Cover
            </div>
          )}
          <div tw="flex flex-col">
            <div tw="flex">
              {headerGroup.headers
                .filter(
                  (header) =>
                    !header.column.isPrivate && !header.column.isPrimary,
                )
                .map((header) => {
                  const { column } = header;
                  return (
                    <div
                      key={`${column.id}-label`}
                      tw="truncate flex items-center px-3 xl:px-4"
                      style={{
                        width: column.getSize() || '150px',
                        minWidth: column.columnDef.minSize || 'auto',
                        maxWidth: column.columnDef.maxSize || 'auto',
                        ...(column.getIsSorted()
                          ? {
                              backgroundColor: 'rgb(254, 248, 244)',
                            }
                          : {}),
                      }}
                    >
                      {flexRender(column.columnDef.header, header.getContext())}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
