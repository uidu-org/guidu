import {
  Groupers,
  GroupersKeys,
  TimeFrameKeys,
  TimeFrames,
} from '@uidu/dashboard-controls';
import { ReactGridLayoutProps } from 'react-grid-layout';

export type DashboardManagerProps = {
  children: ({ renderControls, renderDashlets }) => any;
  rowData: any;
  defaultTimeFrame: string;
  defaultTimeFrameGrouping: string;
  gridProps?: ReactGridLayoutProps;
  availableTimeFrames: Array<TimeFrames>;
  availableGroupers: Array<Groupers>;
};

export type DashboardManagerState = {
  timeFrame: TimeFrameKeys;
  timeFrameGrouping: GroupersKeys;
  timeRange: {
    range: {
      from: any;
      to: any;
    };
    previousRange?: {
      from: any;
      to: any;
    };
  };
};
