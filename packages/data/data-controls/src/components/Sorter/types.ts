import { ColumnApi, GridApi } from '@ag-grid-community/core';
import { Column } from '@uidu/table';

export type Sort = {
  colId: string;
  index: number;
  sort: 'asc' | 'desc';
};

export type SorterProps = {
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  sorters: Array<Sort>;
  columnDefs: Column[];
};
