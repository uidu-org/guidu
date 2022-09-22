import { Table } from '@tanstack/react-table';

export type Sort = {
  id: string;
  desc: boolean;
};

export type SorterProps<T> = {
  tableInstance: Table<T>;
  sorters: Array<Sort>;
};

export type SorterFormProps<T> = {
  tableInstance: Table<T>;
  closePopup: () => void;
};
