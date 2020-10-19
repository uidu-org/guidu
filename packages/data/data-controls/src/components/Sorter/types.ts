import { Field } from '@uidu/data-fields';

export type Sort = {
  id: string;
  desc: boolean;
};

export type SorterProps = {
  tableInstance: any;
  sorters: Array<Sort>;
  columnDefs: Field[];
};

export type SorterFormProps = {
  tableInstance: any;
};
