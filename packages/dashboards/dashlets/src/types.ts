import { Layout } from 'react-grid-layout';

export type BlockProps = {
  kind: string;
  namespace: string;
  label: string;
  rollup?: Array<any>;
  formatter?: string;
} & Layout;

export type BlocksProps = {
  blocks: Array<BlockProps>;
  comparatorData?:
    | {
        [key: string]: Array<any>;
      }
    | {};
  rowData: {
    [key: string]: Array<any>;
  };
};
