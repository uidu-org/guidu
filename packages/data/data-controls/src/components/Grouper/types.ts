import { Column } from '@uidu/table';

export type GrouperProps = {
  groupers: Array<any>;
  columnDefs: Column[];
  addGrouper: (grouper: any) => void;
  removeGrouper: (groper: any) => void;
};
