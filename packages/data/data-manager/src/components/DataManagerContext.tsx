import { Column, Table } from '@tanstack/react-table';
import React, { createContext, useContext, useMemo } from 'react';

interface DataManagerContextProps<T> {
  tableInstance: Table<T>;
  columns: Column<T, unknown>[];
  onItemClick: (item: T) => void;
  currentView?: any;
  updateView?: (name: string, value: any) => Promise<any>;
  rowData?: Array<T>;
  onAddField?: () => void;
  columnCount?: number;
  setAggregation?: () => void;
  setColumnWidth?: () => void;
}

export const DataManagerContext =
  createContext<DataManagerContextProps<T>>(null);

function DataManagerProvider<T>({
  children,
  rowData = [],
  columns,
  currentView,
  updateView,
  tableInstance,
  onItemClick,
}: {
  children: React.ReactNode;
  rowData?: T[];
  columns: Column<T, unknown>[];
  currentView?: any;
  updateView?: (name: string, value: any) => Promise<any>;
  tableInstance: Table<T>;
  onItemClick: (item: T) => void;
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
