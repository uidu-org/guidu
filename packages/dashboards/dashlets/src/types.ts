import { Layout } from 'react-grid-layout';

export type DashletProps = {
  kind: string;
  namespace: string;
  label: string;
  rollup?: Array<any>;
  formatter?: string;
} & Layout;

export type DashletsProps = {
  blocks: Array<DashletProps>;
  comparatorData?:
    | {
        [key: string]: Array<any>;
      }
    | {};
  rowData: {
    [key: string]: Array<any>;
  };
};
