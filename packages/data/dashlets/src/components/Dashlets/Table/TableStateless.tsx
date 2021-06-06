import { useColumnDefs } from '@uidu/dashboard-manager';
import { buildColumns } from '@uidu/data-fields';
import Table from '@uidu/table';
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
        <div
          className="d-flex align-items-center justify-content-center flex-grow-1"
          style={{ minWidth: 0 }}
        >
          <div className="flex-grow-1 text-truncate">{column.name}</div>
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
      headerHeight={48}
      includeFooter={false}
    />
  );
}
