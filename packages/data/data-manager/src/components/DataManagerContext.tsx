import { Column, Table } from '@tanstack/react-table';
import React, { createContext, useContext, useMemo } from 'react';

interface DataManagerContextProps<TTable, TView extends {}> {
  tableInstance: Table<TTable>;
  columns: Column<TTable, unknown>[];
  onItemClick: (item: TTable) => void;
  currentView?: TView;
  updateView?: (name: string, value: any) => Promise<any>;
  rowData?: Array<TTable>;
  columnCount?: number;
  setAggregation?: () => void;
  setColumnWidth?: () => void;
}

export const DataManagerContext =
  createContext<DataManagerContextProps<T, unknown>>(null);

function DataManagerProvider<TTable, TView extends {}>({
  children,
  rowData = [],
  columns,
  currentView,
  updateView,
  tableInstance,
  onItemClick,
}: {
  children: React.ReactNode;
  rowData?: TTable[];
  columns: Column<TTable, unknown>[];
  currentView?: TView;
  updateView?: (name: string, value: any) => Promise<any>;
  tableInstance: Table<TTable>;
  onItemClick: (item: TTable) => void;
}) {
  const setColumnCount = (columnCount) => {
    updateView('preferences', { ...currentView.preferences, columnCount }).then(
      () => {
        setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
      },
    );
  };

  const setAggregation = (column, aggregate) => {
    console.log(column);
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

  const setColumnWidth = (column, width: number) => {
    console.log(column);
    // const index = columnDefinitions.findIndex(({ id }) => id === column.id);
    // setColumnDefinitions([
    //   ...columnDefinitions.slice(0, index),
    //   {
    //     ...columnDefinitions[index],
    //     width,
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
      rowData,
      columnCount: currentView.preferences?.columnCount,
      setColumnCount,
      setAggregation,
      setColumnWidth,
      onItemClick,
    }),
    [
      tableInstance,
      currentView,
      updateView,
      columns,
      rowData,
      setColumnCount,
      onItemClick,
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
