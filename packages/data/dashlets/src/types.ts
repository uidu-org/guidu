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
  label?: string | React.ReactNode;
  description?: string | React.ReactNode;
  formatter?: string;
  dashlets?: DashletProps[];
  itemBefore?: React.ReactNode;
  /** Config is AmCharts JSON config */
  config?: any;
  /** Quewry is CubeJs query props */
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
  showHeader?: boolean;
};
