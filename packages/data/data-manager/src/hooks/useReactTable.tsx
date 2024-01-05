/* eslint-disable react/jsx-props-no-spreading */
import {
  CellContext,
  ColumnDef,
  FilterFn,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  Table,
  TableOptions,
  useReactTable as useReactTableOriginal,
} from '@tanstack/react-table';
import { Aggregated, Header } from '@uidu/table';
import React, { useCallback, useMemo } from 'react';
import { fuzzyFilter } from '../utils';

const filterFn: FilterFn<any> = (row, columnId, filterValue: string) => {
  const search = filterValue.toLowerCase();
  return row.getValue<string>(columnId)?.toLowerCase().includes(search);
};

filterFn.autoRemove = () => false;

export default function useReactTable<T>(props: TableOptions<T>): Table<T> {
  const Cell = useCallback(
    ({ column, getValue }: CellContext<any, unknown>) =>
      column.columnDef.meta?.valueFormatter ? (
        <>{column.columnDef.meta.valueFormatter(getValue())}</>
      ) : (
        getValue() || null
      ),
    [],
  );

  const defaultColumn: Partial<ColumnDef<T>> = useMemo(
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
      filterFn,
    }),
    [Cell],
  );

  return useReactTableOriginal<T>({
    defaultColumn,
    columnResizeMode: 'onChange',
    globalFilterFn: fuzzyFilter,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFilteredRowModel: getFilteredRowModel(),
    //
    debugAll: process.env.NODE_ENV === 'development',
    ...props,
  });
}
