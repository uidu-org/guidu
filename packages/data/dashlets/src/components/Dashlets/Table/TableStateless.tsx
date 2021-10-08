import { useColumnDefs } from '@uidu/dashboard-manager';
import { buildColumns } from '@uidu/data-fields';
import Table, { Td, Th } from '@uidu/table';
import React, { useMemo } from 'react';
import { useFlexLayout, useSortBy, useTable } from 'react-table';

export default function TableStateless({ values, keys, onItemClick }) {
  const columnDefs = useColumnDefs();

  const columns = useMemo(
    () =>
      buildColumns([
        {
          kind: 'default',
          name: 'Default fields',
          columns: keys.map((c) => {
            return {
              ...c,
              field: c.key,
              id: c.key,
              accessor: (row) => row[c.key],
              name: c.title,
              kind: c.meta ? c.meta.kind : 'string',
              fieldGroup: 'default',
              ...columnDefs[c.key],
            };
          }),
        },
      ]),
    [keys],
  );

  const data = useMemo(() => values, [values]);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 80,
      width: 150,
      maxWidth: 250,
      canHide: true,
      canSortBy: true,
      canGroupBy: false,
      Header: ({ column }) => (
        <div tw="flex items-center justify-center flex-grow min-w-0">
          <div tw="flex-grow truncate">{column.name}</div>
        </div>
      ),
      Cell: ({ column, value }) =>
        column.valueFormatter ? (
          <>{column.valueFormatter({ value })}</>
        ) : (
          value || null
        ),
    }),
    [],
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout,
    useSortBy,
  );

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
          component: (props) => {
            return <Th tw="px-6" {...props} />;
          },
        },
      }}
    />
  );
}
