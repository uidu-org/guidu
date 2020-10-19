import { Field } from '@uidu/data-fields';

export type Group = {
  id: string;
  index?: number;
};

export type GrouperProps = {
  tableInstance: any;
  groupers?: Array<Group>;
  columnDefs?: Field[];
};

export type GrouperFormProps = {
  tableInstance: any;
};
