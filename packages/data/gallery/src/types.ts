import { Group, Sort } from '@uidu/data-controls';
import { Field } from '@uidu/data-fields';

export type GalleryProps = {
  columnCount: number;
  columnDefs: Array<Field>;
  gutterSize: number;
  onItemClick?: ({ data }: { data: any }) => void;
  sorters?: Array<Sort>;
  groupers?: Array<Group>;
  tableInstance: any;
};
