import { GridApi, ISimpleFilterModel } from '@ag-grid-community/core';
import { Column } from '@uidu/table';

export type FilterModel = ISimpleFilterModel;

export type FiltererProps = {
  gridApi: GridApi;
  filterModel: FilterModel;
  filtersCount: number;
  columnDefs: Column[];
};
