import { DataView } from '@uidu/data-views';

export type ViewerProps = {
  dataViews?: Array<DataView>;
  availableViews?: Array<DataView>;
  currentView?: DataView;
  onChange?: (dataView: DataView) => void;
  onAdd?: (dataview: DataView) => void;
};
