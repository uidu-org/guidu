import { Column } from '@uidu/table';

export type Sort = {
  colId: {
    colId: string;
  };
  index: number;
  sort: {
    id: 'asc' | 'desc';
    name: 'asc' | 'desc';
  };
};

export type SorterProps = {
  onChange: (sorters: Array<Sort>) => void;
  sorters: Array<Sort>;
  columnDefs: Column[];
};
