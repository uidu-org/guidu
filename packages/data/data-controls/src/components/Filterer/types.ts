import { Column } from '@uidu/table';
import { ISimpleFilterModel } from 'ag-grid-community';

export type FilterModel = ISimpleFilterModel;

export type FiltererProps = {
  onChange: (filters: Array<any>) => void;
  filterModel: FilterModel;
  filters?: Array<any>;
  columnDefs: Column[];
};
