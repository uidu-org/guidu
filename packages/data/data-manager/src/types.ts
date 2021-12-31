import { FieldGroup } from '@uidu/data-fields';
import { DataView } from '@uidu/data-views';
import React from 'react';

export type RowAction = {
  children: any;
  onClick: any;
};

export type DataManagerProps = {
  columnDefs: Array<FieldGroup>;
  children: React.ReactElement;
  currentView?: DataView;
  onViewUpdate?: (state: any) => void;
  updateView?: (name: string, value: any) => Promise<any>;
  isAutoSaving?: string;
  rowData?: Array<any>;
  onAddField?: () => void;
  onItemClick?: ({ data }: { data: any }) => void;
  onItemSelect?: ({ data }: { data: any }) => void;
  canSelectRows?: boolean;
  getExportFileBlob?: any;
  getExportFileName: ({
    fileType,
    all,
  }: {
    fileType?: string;
    all?: boolean;
  }) => string;
  actions?: RowAction[];
  pageSize?: number;
  forwardedRef: React.Ref<any>;
};

export type DataManagerCubeProps = DataManagerProps & {
  resultSet: any;
  query: any;
  onReady?: (resultSet: any) => void;
  subscribe: boolean;
};
