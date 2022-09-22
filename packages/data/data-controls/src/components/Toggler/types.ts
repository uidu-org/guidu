import { Table } from '@tanstack/react-table';

export type TogglerProps<T> = {
  onDragEnd: (params) => void;
  tableInstance: Table<T>;
};

export type TogglerFormProps<T> = {
  tableInstance: Table<T>;
};
