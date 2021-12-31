/* eslint-disable react/jsx-props-no-spreading */

import { CubeContext, useCubeQuery } from '@cubejs-client/react';
import { buildColumns } from '@uidu/data-fields';
import React, { useContext, useEffect, useMemo } from 'react';
import { DataManagerCubeProps } from '..';
import DataManagerComponent from './DataManager';

function DataManagerResults({
  resultSet,
  columnDefs,
  ...rest
}: DataManagerCubeProps) {
  const columns = useMemo(() => {
    if (resultSet) {
      return buildColumns([
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
      ]);
    }
    return [];
  }, [resultSet]);

  const data = useMemo(() => {
    if (resultSet) {
      return resultSet.tablePivot();
    }
    return [];
  }, [resultSet]);

  return <DataManagerComponent {...rest} columnDefs={columns} rowData={data} />;
}

export default function DataManager({
  columnDefs,
  currentView,
  children,
  onViewUpdate,
  isAutoSaving,
  onReady = (resultSet: any) => null,
  subscribe = false,
  ...rest
}: DataManagerCubeProps) {
  const { cubejsApi } = useContext(CubeContext);
  const { query } = currentView;

  const { refetch, resultSet, error, isLoading } = useCubeQuery(query, {
    cubejsApi,
    subscribe,
  });

  useEffect(() => {
    onReady({ refetch, resultSet });
  }, [resultSet, refetch]);

  if (error) {
    return <p>Query is invalid</p>;
  }

  return (
    <DataManagerResults
      {...rest}
      subscribe={subscribe}
      resultSet={resultSet}
      columnDefs={columnDefs}
      children={children}
      currentView={currentView}
      onViewUpdate={onViewUpdate}
      isAutoSaving={isAutoSaving}
    />
  );
}
