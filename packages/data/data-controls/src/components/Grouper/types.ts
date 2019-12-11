import { ColumnApi, GridApi } from '@ag-grid-community/core';
import { Column } from '@uidu/table';

export type Group = {
  colId: string;
  index?: number;
};

export type GrouperProps = {
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  groupers: Array<Group>;
  columnDefs: Column[];
};
