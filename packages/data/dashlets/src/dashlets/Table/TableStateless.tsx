import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDashboardManager } from '@uidu/dashboard-manager';
import Table, { Td, Th } from '@uidu/table';
import React, { useMemo } from 'react';

export default function TableStateless<T>({
  values,
  keys,
  onItemClick,
}: {
  values: T[];
  keys: { key: string; title: string }[];
  onItemClick: (item: T) => void;
}) {
  const { columnDefs } = useDashboardManager();

  const columns = useMemo(
    () =>
      keys.map((c) => ({
        ...c,
        id: c.key,
        accessorFn: (row) => row[c.key],
        ...(columnDefs ? columnDefs[c.key] : {}),
        meta: {
          name: c.title,
          kind: c.meta ? c.meta.kind : 'string',
          ...(columnDefs ? columnDefs[c.key]?.meta : {}),
        },
      })),
    [keys, columnDefs],
  );

  const data = useMemo(() => values, [values]);

  const defaultColumn: Partial<ColumnDef<T>> = React.useMemo(
    () => ({
      minSize: 80,
      size: 150,
      enableHiding: true,
      enableSorting: true,
      enableGrouping: false,
      header: (props) => (
        <div tw="flex items-center justify-center flex-grow min-w-0">
          <div tw="flex-grow truncate">{props.column.columnDef.meta.name}</div>
        </div>
      ),
      cell: ({ column, getValue }) =>
        column.columnDef.meta?.valueFormatter ? (
          <>{column.columnDef.meta?.valueFormatter(getValue())}</>
        ) : (
          getValue() || null
        ),
    }),
    [],
  );

  const tableInstance = useReactTable<T>({
    columns,
    data,
    defaultColumn,
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
