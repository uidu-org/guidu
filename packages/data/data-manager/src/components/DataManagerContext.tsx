import { FieldGroup } from '@uidu/data-fields';
import React, { createContext, useContext } from 'react';
import {
  UseColumnOrderInstanceProps,
  UseExpandedInstanceProps,
  UseFiltersInstanceProps,
  UseGroupByInstanceProps,
  UsePaginationInstanceProps,
  UseRowSelectInstanceProps,
  UseSortByInstanceProps,
  UseTableInstanceProps,
} from 'react-table';

export interface TableInstance<D extends object = {}>
  extends UseColumnOrderInstanceProps<D>,
    UseExpandedInstanceProps<D>,
    UseFiltersInstanceProps<D>,
    UseGroupByInstanceProps<D>,
    UsePaginationInstanceProps<D>,
    UseRowSelectInstanceProps<D>,
    UseTableInstanceProps<D>,
    UseSortByInstanceProps<D> {}

export const DataManagerContext = createContext<{
  tableInstance: TableInstance<any>;
  columnDefs: Array<FieldGroup>;
  columns: Array<FieldGroup>;
  currentView?: any;
  updateView?: (name: string, value: any) => Promise<any>;
  rowData?: Array<any>;
  onAddField?: () => void;
}>(null);

function DataManagerProvider({
  children,
  rowData = [],
  columnDefs: columns,
  currentView,
  updateView,
  tableInstance,
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

  return (
    <DataManagerContext.Provider
      value={{
        tableInstance,
        currentView,
        updateView,
        columns,
        columnDefs: columns,
        rowData,
        columnCount: currentView.preferences?.columnCount,
        setColumnCount,
        setAggregation,
        setColumnWidth,
      }}
    >
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
