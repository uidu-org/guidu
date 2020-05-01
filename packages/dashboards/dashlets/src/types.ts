import { Layout } from 'react-grid-layout';

export type DashletFilter = {
  dimension: string;
  operator: string;
  values: string[];
};

export type DashletTimeDimension = {
  dimension: string;
  dateRange?: string | string[];
  granularity?: string;
};

export type DashletProps = {
  kind: string;
  label?: string;
  dashlets?: DashletProps[];
  itemBefore?: React.ReactNode;
  query?: {
    measures?: string[];
    dimensions?: string[];
    segments?: string[];
    filters?: DashletFilter[];
    timeDimensions?: DashletTimeDimension[];
    limit?: number;
    offset?: number;
    order?: {
      [k: string]: 'asc' | 'desc';
    };
    timezone?: string;
  };
  layout: Omit<Layout, 'i'>;
};

export type DashletsProps = {
  dashlets: DashletProps[];
};
