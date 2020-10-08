import { Column } from '@uidu/table';

export type FiltererProps = {
  tableInstance: any;
  columnDefs: Column[];
};

export type FiltererFormProps = {
  tableInstance: any;
  filters: Array<any>;
  filtersCount: number;
};
