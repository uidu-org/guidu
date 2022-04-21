import { DashletProps } from '@uidu/dashlets';
import { ReactGridLayoutProps } from 'react-grid-layout';

export type DashboardManagerProps = {
  children: ({
    renderControls,
    renderDashlets,
  }: {
    renderControls: () => any;
    renderDashlets: ({ dashlets }: { dashlets: DashletProps[] }) => any;
  }) => any;
  gridProps?: ReactGridLayoutProps;
  columnDefs?: any;
  apiUrl?: string;
};
