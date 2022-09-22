import { Table } from '@tanstack/react-table';
import { ChangeEvent } from 'react';

export type FinderProps<T> = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  tableInstance: Table<T>;
};
