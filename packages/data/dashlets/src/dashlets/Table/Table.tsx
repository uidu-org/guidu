import { ResultSet } from '@cubejs-client/core';
import { useDashboardManager } from '@uidu/dashboard-manager';
import React, { useMemo } from 'react';
import DashletLoader from '../../components/DashletLoader';
import TableStateless from './TableStateless';

function TableCubeWrapper({
  resultSet,
  onItemClick,
  ...rest
}: {
  resultSet: ResultSet;
  onItemClick: (item: any) => void;
}) {
  const { columnDefs } = useDashboardManager();
  const keys = resultSet.tableColumns();
  const values = resultSet.tablePivot();

  const columns = useMemo(
    () =>
      keys.map((c) => ({
        id: c.key,
        accessorFn: (row) => row[c.key],
        ...(columnDefs ? columnDefs[c.key] : {}),
        ...c,
        meta: {
          name: c.title,
          kind: c.meta ? c.meta.kind : 'string',
          ...(columnDefs ? columnDefs[c.key]?.meta : {}),
        },
      })),
    [keys, columnDefs],
  );

  return (
    <TableStateless
      values={values}
      columns={columns}
      onItemClick={onItemClick}
      {...rest}
    />
  );
}

export default function Table({
  data,
  resultSet,
  onItemClick,
  ...rest
}: {
  data;
  resultSet: ResultSet;
  onItemClick: (item: any) => void;
}) {
  if (data) {
    return <TableStateless onItemClick={onItemClick} {...rest} {...data} />;
  }

  if (!resultSet) {
    return <DashletLoader />;
  }

  return (
    <TableCubeWrapper
      onItemClick={onItemClick}
      resultSet={resultSet}
      {...rest}
    />
  );
}
