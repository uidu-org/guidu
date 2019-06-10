import { ReactGridLayoutProps } from 'react-grid-layout';

export type DashboardManagerProps = {
  rowData: any;
  defaultTimeFrame: string;
  defaultTimeFrameGrouping: string;
  gridProps?: ReactGridLayoutProps;
};
