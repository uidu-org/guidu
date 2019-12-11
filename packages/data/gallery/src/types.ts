import { FilterModel, Group, Sort } from '@uidu/data-controls';
import { Column } from '@uidu/table';

export type GalleryProps = {
  columnCount: number;
  rowData: Array<{ data: any }>;
  columnDefs: Array<Column>;
  gutterSize: number;
  onItemClick?: ({ data }: { data: any }) => void;
  sorters?: Array<Sort>;
  groupers?: Array<Group>;
  filterModel?: FilterModel;
};
