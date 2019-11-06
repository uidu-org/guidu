import { Column } from '@uidu/table';

export type TogglerProps = {
  columnDefs: Column[];
  onDragEnd: (params) => void;
  onToggle: (colId: Column['colId'], hide: boolean) => void;
};
