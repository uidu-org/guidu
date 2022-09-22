import { Column, Table } from '@tanstack/react-table';
import React, { createContext, useCallback, useContext, useMemo } from 'react';

interface DataManagerPassedDownProps<TTable, TView extends {}> {
  tableInstance: Table<TTable>;
  columns: Column<TTable, unknown>[];
  onItemClick: (item: TTable) => void;
  currentView?: TView;
  updateView?: (name: string, value: any) => Promise<any>;
  pagination?: {
    isLoadingNext?: boolean;
    loadNext?: () => void;
    hasNext?: boolean;
  };
}

interface DataManagerContextProps<TTable, TView extends {}>
  extends DataManagerPassedDownProps<TTable, TView> {
  columnCount?: number;
  setAggregation?: () => void;
  setColumnCount?: (columnCount: number) => void;
  setColumnWidth?: (column: any) => void;
}

interface DataManagerProviderProps<TTable, TView extends {}>
  extends DataManagerPassedDownProps<TTable, TView> {
  children: React.ReactNode;
}

export const DataManagerContext =
  createContext<DataManagerContextProps<T, unknown>>(null);

function DataManagerProvider<TTable, TView extends {}>({
  children,
  columns,
  currentView,
  updateView,
  tableInstance,
  onItemClick,
  pagination,
}: DataManagerProviderProps<TTable, TView>) {
  const setColumnCount = useCallback(
    (columnCount: number) => {
      updateView('preferences', {
        ...currentView.preferences,
        columnCount,
      })
        .then(() => {
          setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
        })
        .catch(() => {});
    },
    [updateView, currentView],
  );

  const setAggregation = () => {
    // const index = columnDefinitions.findIndex(({ id }) => id === column.id);
    // setColumnDefinitions([
    //   ...columnDefinitions.slice(0, index),
    //   {
    //     ...columnDefinitions[index],
    //     aggregate,
    //   },
    //   ...columnDefinitions.slice(index + 1),
    // ]);
  };

  const value = useMemo(
    () => ({
      tableInstance,
      currentView,
      updateView,
      columns,
      columnCount: currentView.preferences?.columnCount,
      setColumnCount,
      // setAggregation,
      onItemClick,
      pagination,
    }),
    [
      tableInstance,
      currentView,
      updateView,
      columns,
      setColumnCount,
      onItemClick,
      pagination,
    ],
  );

  return (
    <DataManagerContext.Provider value={value}>
      {children}
    </DataManagerContext.Provider>
  );
}

function useDataManagerContext() {
  const context = useContext(DataManagerContext);
  if (context === undefined) {
    throw new Error(
      'useDataManagerContext must be used within a DataManagerProvider',
    );
  }
  return context;
}

export { DataManagerProvider, useDataManagerContext };
