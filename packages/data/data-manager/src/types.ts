import { DataView } from '@uidu/data-views';
import { Column } from '@uidu/table';

export type DataManagerProps = {
  currentView?: DataView;
  columnDefs: Array<Column>;
  rowData: Array<any>;
  onAddField?: () => void;
  onGridReady?: (params) => void;
  onFirstDataRendered?: (params) => void;
  onItemClick?: (item) => void;
};
