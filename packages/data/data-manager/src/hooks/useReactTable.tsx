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
  TableOptions,
  useReactTable as useReactTableOriginal,
} from '@tanstack/react-table';
import { Aggregated, Header } from '@uidu/table';
import React, { useCallback, useMemo } from 'react';
import { fuzzyFilter } from '../utils';

export default function useReactTable<T>(props: TableOptions<T>) {
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
    }),
    [Cell],
  );

  return useReactTableOriginal<T>({
    defaultColumn,
    columnResizeMode: 'onEnd',
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
    ...props,
  });
}
