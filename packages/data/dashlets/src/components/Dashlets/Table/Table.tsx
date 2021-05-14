import { useColumnDefs } from '@uidu/dashboard-manager';
import { buildColumns } from '@uidu/data-fields';
import React, { useMemo } from 'react';
import { useFlexLayout, useSortBy, useTable } from 'react-table';
import Loader from '../../Loader';

export default function Table({ resultSet }) {
  const columnDefs = useColumnDefs();

  if (!resultSet) {
    return <Loader />;
  }

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 80,
      width: 200,
      maxWidth: 400,
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

  console.log(resultSet);
  console.log(resultSet.tableColumns());

  const columns = useMemo(
    () =>
      buildColumns([
        {
          kind: 'default',
          name: 'Default fields',
          columns: resultSet.tableColumns().map((c) => {
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
    [resultSet],
  );

  const data = useMemo(() => resultSet.tablePivot(), [resultSet]);

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout,
    useSortBy,
  );

  console.log(tableInstance);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <div {...getTableProps([{ style: { overflow: 'auto' } }])}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--body-bg)',
          }}
          className="border-bottom"
        >
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps([
                    {
                      style: {
                        ...column.style,
                        ...column.headerStyle,
                        padding: '1rem 1.5rem',
                        display: 'flex',
                      },
                    },
                  ])}
                >
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <div
                      {...cell.getCellProps([
                        {
                          style: {
                            ...cell.column.cellStyle,
                            padding: '1rem 1.5rem',
                            display: 'flex',
                          },
                        },
                      ])}
                    >
                      {cell.render('Cell', { ...cell.column.cellProps })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="card-header d-flex align-items-center">
          <span className="text-truncate">{label}</span>
          {comparatorData && (
            <Switch
              isPrevious={showPrevious}
              comparatorData={comparatorData}
              onChange={e =>
                this.setState(prevState => ({
                  showPrevious: !prevState.showPrevious,
                }))
              }
              range={
                comparatorData && showPrevious
                  ? timeRange.previousRange
                  : timeRange.range
              }
            />
          )}
        </div> */}
      {/* <Items
        resultSet={resultSet}
        tableColumns={resultSet.tableColumns()}
        data={resultSet.loadResponse.results}
        tableInstance={tableInstance}
      /> */}
    </>
  );
}
