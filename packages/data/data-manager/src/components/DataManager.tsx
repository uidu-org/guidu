/* eslint-disable react/jsx-props-no-spreading */
import {
  CellContext,
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Aggregated, Header, RowActions } from '@uidu/table';
import React, { useCallback, useImperativeHandle, useMemo } from 'react';
import { DataManagerProps } from '../types';
import { fuzzyFilter } from '../utils';
import { DataManagerProvider } from './DataManagerContext';

const defaultRowData = [];
const defaultOptions = {};
const defaultOnViewUpdate = () => {};

export default function DataManager<T>({
  children,
  columns,
  rowData = defaultRowData as T[],
  onItemClick,
  onViewUpdate = defaultOnViewUpdate,
  currentView,
  updateView,
  actions = () => [],
  forwardedRef,
  options = defaultOptions,
  pagination,
}: DataManagerProps<T>) {
  const Cell = useCallback(
    ({ column, getValue }: CellContext<any, unknown>) =>
      column.columnDef.meta?.valueFormatter ? (
        <>{column.columnDef.meta.valueFormatter(getValue())}</>
      ) : (
        getValue() || null
      ),
    [],
  );

  const RowActionsCell = useCallback(
    (params: CellContext<T, unknown>) => (
      <RowActions params={params} actions={actions} />
    ),
    [actions],
  );

  const defaultColumns = useMemo(
    () => [
      ...columns,
      ...(actions.length > 0
        ? [
            {
              id: 'actions',
              header: (props) => null,
              footer: (props) => null,
              cell: RowActionsCell,
              // suppressMenu: true,
              enableHiding: false,
              enableResizing: false,
              minSize: 56,
              size: 56,
              maxSize: 56,
              meta: {
                pinned: 'right',
                cellProps: {
                  style: { padding: 0 },
                },
              },
            } as Partial<ColumnDef<T>>,
          ]
        : []),
    ],
    [columns, actions, RowActionsCell],
  );

  const defaultColumn: Partial<ColumnDef<T>> = React.useMemo(
    () => ({
      minSize: 80,
      size: 240,
      enableResizing: true,
      enableHiding: true,
      enableColumnFilter: true,
      enableGrouping: false,
      header: Header,
      aggregatedCell: Aggregated,
      cell: Cell,
    }),
    [Cell],
  );

  const table = useReactTable<T>({
    data: rowData,
    defaultColumn,
    columns: defaultColumns,
    // state: {},
    columnResizeMode: 'onEnd',
    // onSortingChange: console.log,
    // onStateChange: console.log,
    // filters
    globalFilterFn: fuzzyFilter,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    //
    debugAll: process.env.NODE_ENV === 'development',
    ...options,
  });

  useImperativeHandle(forwardedRef, () => table, [table]);

  // const onViewUpdateDebounce = useAsyncDebounce(onViewUpdate, 100);
  // const onItemSelectDebounce = useAsyncDebounce(onItemSelect, 100);

  // useEffect(() => {
  //   onViewUpdateDebounce(state);
  // }, [state, onViewUpdateDebounce]);

  // useEffect(() => {
  //   onItemSelectDebounce(selectedFlatRows);
  // }, [selectedFlatRows, onItemSelectDebounce]);

  return (
    <DataManagerProvider
      currentView={currentView}
      rowData={rowData}
      columns={table.getAllColumns()}
      tableInstance={table}
      onItemClick={onItemClick}
      onViewUpdate={onViewUpdate}
      updateView={updateView}
      actions={actions}
      forwardedRef={forwardedRef}
      pagination={pagination}
    >
      {children}
    </DataManagerProvider>
  );
}
