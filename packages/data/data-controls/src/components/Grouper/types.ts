import { ColumnApi, GridApi } from '@ag-grid-community/core';
import { Column } from '@uidu/table';

export type GrouperProps = {
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  groupers: Array<any>;
  columnDefs: Column[];
};
