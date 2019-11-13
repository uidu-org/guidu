import { ISimpleFilterModel } from '@ag-grid-community/core';
import { Column } from '@uidu/table';

export type FilterModel = ISimpleFilterModel;

export type FiltererProps = {
  onChange: (filters: Array<any>) => void;
  addFilter: (filter: any) => void;
  filterModel: FilterModel;
  filters?: Array<any>;
  columnDefs: Column[];
};
