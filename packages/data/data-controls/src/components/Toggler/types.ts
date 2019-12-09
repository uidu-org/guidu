import { ColumnApi } from '@ag-grid-community/core';
import { Column } from '@uidu/table';

export type TogglerProps = {
  columnDefs: Column[];
  onDragEnd: (params) => void;
  gridColumnApi: ColumnApi;
};
