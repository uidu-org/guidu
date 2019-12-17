import { DataView } from '@uidu/data-views';
import { ColumnGroup } from '@uidu/table';

export type DataManagerProps = {
  currentView?: DataView;
  updateView?: (currentView: DataView) => Promise<any>;
  columnDefs: Array<ColumnGroup>;
  rowData: Array<any>;
  onAddField?: () => void;
  onGridReady?: (params) => void;
  onFirstDataRendered?: (params) => void;
  onItemClick?: ({ data }: { data: any }) => void;
};
