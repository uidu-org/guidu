import { Table } from '@tanstack/react-table';

export type Group = {
  id: string;
  index?: number;
};

export type GrouperProps<T> = {
  tableInstance: Table<T>;
  groupers?: Array<Group>;
};

export type GrouperFormProps<T> = {
  tableInstance: Table<T>;
  closePopup: () => void;
};
