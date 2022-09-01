import { Table as TableType } from '@tanstack/react-table';
import { VirtualizerOptions } from '@tanstack/react-virtual';

export interface OverrideableTableProps {
  includeFooter?: boolean;
  rowHeight?: number;
  headerHeight?: number;
  virtualizerOptions?: Partial<VirtualizerOptions>;
}

export interface TableProps<T> extends OverrideableTableProps {
  tableInstance: TableType<T>;
  onItemClick: (row: T) => void;
  overrides?: Record<string, any>;
  // pagination
  pagination?: {
    isLoadingNext?: boolean;
    loadNext?: () => void;
    hasNext?: boolean;
  };
}
