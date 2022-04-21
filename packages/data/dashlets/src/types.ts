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
  /** Pass data as props */
  data?: Array<any>;
  /** Pass data as props */
  dataTransformer?: (data: any) => any;
  /** Pass data as props */
  dataFormatter?: (data: any) => any;
  /** Pass query variables for GQL */
  gql?: Record<string, any>;
  /** Use custom component as renderer */
  component?: React.FC<any>;
  /** Show dashlet as card */
  isCard?: boolean;
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
