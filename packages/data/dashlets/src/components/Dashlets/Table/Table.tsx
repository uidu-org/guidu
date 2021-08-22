import React from 'react';
import Loader from '../../Loader';
import TableStateless from './TableStateless';

export default function Table({ data, resultSet, onItemClick, ...rest }) {
  if (data) {
    return <TableStateless onItemClick={onItemClick} {...rest} {...data} />;
  }

  if (!resultSet) {
    return <Loader />;
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
