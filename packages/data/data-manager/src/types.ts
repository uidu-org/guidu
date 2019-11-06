import { DataView } from '@uidu/data-views';
import { Column } from '@uidu/table';

export type DataManagerProps = {
  availableViews?: Array<DataView>;
  dataViews?: Array<DataView>;
  currentView?: DataView;
  columnDefs: Array<Column>;
  rowData: Array<any>;
  onGridReady?: (params) => void;
  onFirstDataRendered?: (params) => void;
  onItemClick?: (item) => void;
  onViewChange?: (item) => void;
  onViewAdd?: (item) => void;
};
