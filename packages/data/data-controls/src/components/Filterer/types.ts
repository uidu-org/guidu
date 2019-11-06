import { Column } from '@uidu/table';

export type FiltererProps = {
  onChange: (filters: Array<any>) => void;
  filters: Array<any>;
  columnDefs: Column[];
};
