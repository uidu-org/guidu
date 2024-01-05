import { Table } from '@tanstack/react-table';

import { FC } from 'react';
import { TableVirtuosoProps } from 'react-virtuoso';
import { LoadingRowProps } from './components/LoadingRow';
import { LoadingSkeletonProps } from './components/LoadingSkeleton';

export interface OverrideableTableProps<T> {
  includeFooter?: boolean;
  rowHeight?: number;
  headerHeight?: number;
  virtuosoOptions?: TableVirtuosoProps<T, unknown>;
  // components
  loadingRow?: FC<LoadingRowProps>;
  loadingSkeleton?: FC<LoadingSkeletonProps<T>>;
  // pending
  isPending?: boolean;
}

export interface TableProps<T> extends OverrideableTableProps<T> {
  tableInstance: Table<T>;
  onItemClick: (row: T) => void;
  overrides?: Record<string, any>;
  // pagination
  pagination?: {
    isLoadingNext?: boolean;
    loadNext?: () => void;
    hasNext?: boolean;
  };
}
