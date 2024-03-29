import { Table } from '@tanstack/react-table';
import { VirtualizerOptions } from '@tanstack/react-virtual';
import { FC } from 'react';
import { LoadingRowProps } from './components/LoadingRow';
import { LoadingSkeletonProps } from './components/LoadingSkeleton';

export interface OverrideableListProps<T> {
  // includeFooter?: boolean;
  gutterSize?: number;
  rowHeight?: number;
  // headerHeight?: number;
  virtualizerOptions?: Partial<VirtualizerOptions>;
  // components
  loadingRow?: FC<LoadingRowProps>;
  loadingSkeleton?: FC<LoadingSkeletonProps<T>>;
  // pending
  isPending?: boolean;
}

export interface ListProps<T> extends OverrideableListProps<T> {
  tableInstance: Table<T>;
  onItemClick: (item: T) => void;
  overrides?: Record<string, any>;
  // pagination
  pagination?: {
    isLoadingNext?: boolean;
    loadNext?: () => void;
    hasNext?: boolean;
  };
}
