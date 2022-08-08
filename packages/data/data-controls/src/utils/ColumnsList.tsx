import { Column } from '@tanstack/react-table';
import { ButtonItem } from '@uidu/menu';
import React from 'react';

export default function ColumnsList<T>({
  columns,
  onClick,
}: {
  columns: Column<T, unknown>[];
  onClick: (column: Column<T>) => void;
}) {
  return (
    <>
      {columns.map((column) => (
        <ButtonItem
          key={column.id}
          onClick={(e) => {
            e.preventDefault();
            onClick(column);
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(column.columnDef.meta?.icon
            ? {
                iconBefore: (
                  <span tw="w-4 text-center">
                    {column.columnDef?.meta?.icon}
                  </span>
                ),
              }
            : {})}
        >
          {column.columnDef.meta?.name}
        </ButtonItem>
      ))}
    </>
  );
}
