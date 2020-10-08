import { Column } from '@uidu/table';

export type Group = {
  colId: string;
  index?: number;
};

export type GrouperProps = {
  tableInstance: any;
  groupers?: Array<Group>;
  columnDefs?: Column[];
};

export type GrouperFormProps = {
  tableInstance: any;
};
