import { ResultSet } from '@cubejs-client/core';
import React from 'react';
import DashletLoader from '../../components/DashletLoader';
import TableStateless from './TableStateless';

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

  const keys = resultSet.tableColumns();
  const values = resultSet.tablePivot();

  return (
    <TableStateless
      values={values}
      keys={keys}
      onItemClick={onItemClick}
      {...rest}
    />
  );
}
