import { DataView } from '@uidu/data-views';
import { ColumnGroup } from '@uidu/table';

export type DataManagerProps = {
  currentView?: DataView;
  updateView?: (dataView: DataView, props: keyof DataView) => Promise<any>;
  isAutoSaving: string;
  columnDefs: Array<ColumnGroup>;
  rowData: Array<any>;
  onAddField?: () => void;
  onItemClick?: ({ data }: { data: any }) => void;
};
