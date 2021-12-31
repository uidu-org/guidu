/* eslint-disable react/jsx-props-no-spreading */
import {
  Aggregated,
  AggregatedSelection,
  Header,
  HeaderSelection,
  RowActions,
  RowSelection,
} from '@uidu/table';
import React, { useEffect, useImperativeHandle } from 'react';
import {
  useAsyncDebounce,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import { useExportData } from 'react-table-plugins';
import { DataManagerProps } from '../types';
import { DataManagerProvider } from './DataManagerContext';

export default function DataManager({
  children,
  rowData = [],
  columnDefs: columns,
  onItemClick,
  onItemSelect = () => {},
  onViewUpdate = (state) => {},
  currentView,
  updateView,
  actions = [],
  canSelectRows = true,
  forwardedRef,
  getExportFileBlob,
  getExportFileName,
}: DataManagerProps) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 80,
      width: 240,
      maxWidth: 400,
      canHide: true,
      canSortBy: true,
      canGroupBy: false,
      Header,
      Aggregated,
      Cell: ({ column, value }) =>
        column.valueFormatter ? (
          <>{column.valueFormatter({ value })}</>
        ) : (
          value || null
        ),
    }),
    [],
  );

  const tableInstance = useTable(
    {
      columns,
      data: rowData,
      defaultColumn,
      initialState: {
        pageSize: 10,
        ...(currentView?.state || {}),
      },
      // useControlledState: (state) => {
      //   return React.useMemo(
      //     () => ({
      //       ...state,
      //       columnDefinitions,
      //     }),
      //     [state],
      //   );
      // },
      getExportFileBlob,
      getExportFileName,
    },
    useFlexLayout,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useResizeColumns,
    useExpanded,
    usePagination,
    useRowSelect,
    useExportData,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        ...(canSelectRows
          ? [
              {
                id: 'uid',
                kind: 'uid',
                field: 'id',
                disableResizing: true,
                minWidth: 56,
                width: 56,
                maxWidth: 56,
                pinned: 'left',
                groupByBoundary: true,
                cellStyle: {
                  padding: 0,
                },
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: (props) =>
                  props.headerGroups.length > 1 ? null : (
                    <HeaderSelection {...props} />
                  ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: RowSelection,
                Aggregated: AggregatedSelection,
                Footer: (info) => {
                  // Only calculate total visits if rows change

                  return <>Total: {info.rows.length}</>;
                },
              },
            ]
          : []),
        ...columns,
        ...(actions.length > 0
          ? [
              {
                id: 'actions',
                kind: 'actions',
                suppressMenu: true,
                disableResizing: true,
                minWidth: 56,
                width: 56,
                maxWidth: 56,
                pinned: 'right',
                Cell: (foo) => <RowActions {...foo} actions={actions} />,
                groupByBoundary: true,
                cellStyle: {
                  padding: 0,
                },
              },
            ]
          : []),
      ]);
    },
  );

  useImperativeHandle(forwardedRef, () => tableInstance, [tableInstance]);

  const { state, selectedFlatRows } = tableInstance;

  const onViewUpdateDebounce = useAsyncDebounce(onViewUpdate, 100);
  const onItemSelectDebounce = useAsyncDebounce(onItemSelect, 100);

  useEffect(() => {
    onViewUpdateDebounce(state);
  }, [state, onViewUpdateDebounce]);

  useEffect(() => {
    onItemSelectDebounce(selectedFlatRows);
  }, [selectedFlatRows, onItemSelectDebounce]);

  return (
    <DataManagerProvider
      currentView={currentView}
      rowData={rowData}
      columnDefs={columns}
      tableInstance={tableInstance}
      onItemClick={onItemClick}
      onItemSelect={onItemSelect}
      onViewUpdate={onViewUpdate}
      updateView={updateView}
      actions={actions}
      canSelectRows={canSelectRows}
      forwardedRef={forwardedRef}
      getExportFileBlob={getExportFileBlob}
      getExportFileName={getExportFileName}
    >
      {children}
    </DataManagerProvider>
  );
}
