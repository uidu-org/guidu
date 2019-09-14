export type DataView = {
  id: string | number;
  kind: string;
  name: string | React.ReactNode;
};

export type ViewerProps = {
  dataViews?: Array<DataView>;
  availableViews?: Array<DataView>;
  currentView?: DataView;
  onChange?: (dataView: DataView) => void;
  onAdd?: (dataview: DataView) => void;
};
