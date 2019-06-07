export type DashboardManagerProps = {
  rowData: Array<any>;
  defaultTimeFrame: string;
  onLayoutChange?: (layout, layouts) => void;
};
