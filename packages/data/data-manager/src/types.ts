import { DataView } from '@uidu/data-controls';

export type DataManagerProps = {
  availableViews?: Array<DataView>;
  dataViews?: Array<DataView>;
  currentView?: DataView;
  columnDefs: Array<any>;
  rowData: Array<any>;
  onItemClick?: (item) => void;
  onViewChange?: (item) => void;
  onViewAdd?: (item) => void;
};
