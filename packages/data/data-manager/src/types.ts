import { ResultSet } from '@cubejs-client/core';
import {
  ColumnDef,
  ColumnPinningPosition,
  Row as RowType,
  RowData,
  TableOptions,
} from '@tanstack/react-table';
import { FieldKind } from '@uidu/data-fields';
import { DataView } from '@uidu/data-views';
import { ButtonItemProps } from '@uidu/menu';
import React from 'react';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    // field Meta
    name?: string | React.ReactNode;
    icon?: string | React.ReactNode;
    description?: string | React.ReactNode;
    color?: string;
    kind?: FieldKind;
    // column behaviors
    isPrimary?: boolean;
    isPrivate?: boolean;
    pinned?: ColumnPinningPosition;
    valueFormatter?: (value: TValue) => React.ReactNode;
    // editing mode
    enableEditing?: boolean;
    // renderers
    filter: ({
      columnDef,
    }: {
      columnDef: ColumnDef<TData, TValue>;
    }) => React.ReactNode;
    // specific field kinds
    options?: Array<{
      id: string | number | null;
      name: string;
      before?: React.ReactNode;
      color?: string;
    }>;
    avatar?: ({ row }: { row: RowType<TData> }) => string;
    max?: number;
  }
}

export type RowAction<T> = {
  key?: string;
  children?: any;
  component?: React.FC<ButtonItemProps>;
  onClick?: ({ row }: { row: RowType<T> }) => void;
};

export type RowActions<T> = {
  name: string;
  items: RowAction<T>[];
};

export type DataManagerProps<T> = {
  columns: ColumnDef<T>[];
  children: React.ReactElement;
  currentView?: DataView;
  onViewUpdate?: (state: any) => void;
  updateView?: (name: string, value: any) => Promise<any>;
  isAutoSaving?: string;
  rowData?: Array<T>;
  onAddField?: () => void;
  onItemClick: (item: T) => void;
  canSelectRows?: boolean;
  getExportFileBlob?: any;
  getExportFileName?: ({
    fileType,
    all,
  }: {
    fileType?: string;
    all?: boolean;
  }) => string;
  actions?: (row: RowType<T>) => RowActions<T>[];
  pageSize?: number;
  forwardedRef: React.Ref<any>;
  options?: Partial<TableOptions<T>>;
};

export type DataManagerCubeProps<T> = DataManagerProps<T> & {
  resultSet: ResultSet;
  columnDefs: Record<string, ColumnDef<T, any>>;
  query: any;
  onReady?: (resultSet: any) => void;
  subscribe: boolean;
};
