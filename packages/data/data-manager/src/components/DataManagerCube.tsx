/* eslint-disable react/jsx-props-no-spreading */

import { CubeContext, useCubeQuery } from '@cubejs-client/react';
import { ColumnDef } from '@tanstack/react-table';
import { getColumnType } from '@uidu/data-fields';
import React, { useContext, useEffect, useMemo } from 'react';
import { DataManagerCubeProps } from '../types';
import DataManagerComponent from './DataManager';

function DataManagerResults<T>({
  resultSet,
  columnDefs,
  ...rest
}: DataManagerCubeProps<T>) {
  const columns: ColumnDef<T>[] = useMemo(() => {
    if (resultSet) {
      return resultSet.tableColumns().map((c) => {
        const columnDef = columnDefs[c.key]?.meta?.kind
          ? getColumnType(columnDefs[c.key].meta?.kind)
          : {
              meta: {
                kind: 'string',
              },
            };
        return {
          ...c,
          id: c.key,
          accessorKey: c.key,
          accessorFn: (row) => row[c.key],
          ...columnDef,
          ...columnDefs[c.key],
          meta: {
            ...c.meta,
            ...columnDef?.meta,
            name: c.title,
            ...columnDefs[c.key]?.meta,
          },
        };
      });
    }
    return [];
  }, [resultSet, columnDefs]);

  const data = useMemo(() => {
    if (resultSet) {
      return resultSet.tablePivot();
    }
    return [];
  }, [resultSet]);

  return <DataManagerComponent {...rest} columns={columns} rowData={data} />;
}

export default function DataManager<T>({
  columnDefs,
  currentView,
  children,
  onViewUpdate,
  isAutoSaving,
  onReady = (resultSet: any) => null,
  subscribe = false,
  ...rest
}: DataManagerCubeProps<T>) {
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
