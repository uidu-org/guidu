import { Table } from '@tanstack/react-table';
import { Group, Sort } from '@uidu/data-controls';
import { Field } from '@uidu/data-fields';

export type GalleryProps<T> = {
  columnCount: number;
  columnDefs: Array<Field>;
  gutterSize: number;
  onItemClick?: (item: T) => void;
  sorters?: Array<Sort>;
  groupers?: Array<Group>;
  tableInstance: Table<T>;
};
