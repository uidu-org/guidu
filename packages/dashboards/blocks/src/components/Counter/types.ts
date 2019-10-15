export type CounterProps = {
  data?: number;
  rowData?: any;
  loaded?: boolean;
  label: string | React.ReactNode;
  formatter?: () => void;
  itemBefore?: React.ReactNode;
  namespace?: string;
  rollup?: [any, any];
};
