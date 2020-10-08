import { Column } from '@uidu/table';

export type Sort = {
  id: string;
  desc: boolean;
};

export type SorterProps = {
  tableInstance: any;
  sorters: Array<Sort>;
  columnDefs: Column[];
};

export type SorterFormProps = {
  tableInstance: any;
};
