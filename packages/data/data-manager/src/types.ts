import { DataView } from '@uidu/data-views';
import { Column } from '@uidu/table';

export type DataManagerProps = {
  currentView?: DataView;
  updateView?: (currentView: DataView) => void;
  columnDefs: Array<Column>;
  rowData: Array<any>;
  onAddField?: () => void;
  onGridReady?: (params) => void;
  onFirstDataRendered?: (params) => void;
  onItemClick?: ({ data }: { data: any}) => void;
};
