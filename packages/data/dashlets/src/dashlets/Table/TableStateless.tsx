import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  HeaderContext,
  useReactTable,
} from '@tanstack/react-table';
import Table, { Td, Th } from '@uidu/table';
import React, { useMemo } from 'react';

function DefaultHeader<T>({ column }: HeaderContext<T, string>) {
  return (
    <div tw="flex items-center justify-center flex-grow min-w-0">
      <div tw="flex-grow truncate">{column.columnDef.meta.name}</div>
    </div>
  );
}

function DefaultCell({ column, getValue }: CellContext<any, string>) {
  if (column.columnDef.meta?.valueFormatter) {
    return column.columnDef.meta?.valueFormatter(getValue());
  }

  if (getValue()) {
    return getValue();
  }

  return null;
}

const defaultColumn = {
  minSize: 80,
  size: 150,
  enableHiding: true,
  enableSorting: true,
  enableGrouping: false,
  header: DefaultHeader,
  cell: DefaultCell,
};

export default function TableStateless<T>({
  values,
  columns,
  defaultColumn: defaultColumnFromProps = defaultColumn,
  onItemClick,
}: {
  values: T[];
  columns: ColumnDef<T>[];
  defaultColumn?: ColumnDef<T>;
  onItemClick: (item: T) => void;
}) {
  const data = useMemo(() => values, [values]);

  const tableInstance = useReactTable<T>({
    columns,
    data,
    defaultColumn: defaultColumnFromProps,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table
      tableInstance={tableInstance}
      onItemClick={onItemClick}
      rowHeight={48}
      headerHeight={42}
      includeFooter={false}
      overrides={{
        Td: {
          component: (props) => <Td tw="px-6" {...props} />,
        },
        Th: {
          component: (props) => <Th tw="px-6" {...props} />,
        },
      }}
    />
  );
}
