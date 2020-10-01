import { Column } from '@uidu/table';

export type Sort = {
  id: string;
  desc: boolean;
};

export type SorterProps = {
  sorters: Array<Sort>;
  columnDefs: Column[];
};
