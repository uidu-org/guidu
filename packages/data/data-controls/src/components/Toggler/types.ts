import { Column } from '@uidu/table';

export type TogglerProps = {
  columnDefs: Column[];
  onDragEnd: (params) => void;
};
