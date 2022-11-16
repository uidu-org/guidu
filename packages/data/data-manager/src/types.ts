import {
  ColumnDef,
  ColumnPinningPosition,
  Row as RowType,
  RowData,
  Table,
} from '@tanstack/react-table';
import { FieldKind } from '@uidu/data-fields';
import { DataView } from '@uidu/data-views';
import { ButtonItemProps } from '@uidu/menu';
import React, { FC } from 'react';

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
    suppressMenu?: boolean;
    pinned?: ColumnPinningPosition;
    valueFormatter?: (value: TValue) => React.ReactNode;
    cellProps?: {
      style?: React.CSSProperties;
      [key: string]: any;
    };
    headerProps?: {
      style?: React.CSSProperties;
      [key: string]: any;
    };
    // editing mode
    enableEditing?: boolean;
    // renderers
    filter?: ({
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
  tableInstance: Table<T>;
  children: React.ReactElement;
  currentView?: DataView;
  onViewUpdate?: (state: any) => void;
  updateView?: (name: string, value: any) => Promise<any>;
  isAutoSaving?: string;
  onItemClick: (item: T) => void;
  canSelectRows?: boolean;
  actions?: (row: RowType<T>) => RowActions<T>[];
  contextMenu?: FC<{ row: RowType<T> }>;
  pagination?: {
    isLoadingNext?: boolean;
    loadNext?: () => void;
    hasNext?: boolean;
  };
};
