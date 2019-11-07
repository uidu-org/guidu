import { Column } from '@uidu/table';

export type Sort = {
  colId: string;
  index: number;
  sort: 'asc' | 'desc';
};

export type SorterProps = {
  onChange: (sorters: Array<Sort>) => void;
  addSorter: (sorter: Sort) => void;
  removeSorter: (sorter: Sort) => void;
  sorters: Array<Sort>;
  columnDefs: Column[];
};
