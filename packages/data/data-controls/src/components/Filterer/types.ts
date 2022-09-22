import { Table } from '@tanstack/react-table';
import { Field } from '@uidu/data-fields';

export type FiltererProps<T> = {
  tableInstance: Table<T>;
  columnDefs: Field[];
};

export type FiltererFormProps<T> = {
  tableInstance: Table<T>;
  closePopup: () => void;
};
