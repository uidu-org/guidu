export type DataManagerProps = {
  availableViews?: Array<any>;
  dataViews?: Array<any>;
  currentView?: any;
  columnDefs: Array<any>;
  rowData: Array<any>;
  onItemClick?: (item) => void;
  onViewChange?: (item) => void;
  onViewAdd?: (item) => void;
};
