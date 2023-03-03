import { ResultSet } from '@cubejs-client/core';

type CounterBaseProps = {
  label: string | React.ReactNode;
  formatter?: () => void;
  formattingFn?: (value: number) => number;
  itemBefore?: React.ReactNode;
};

export type CounterStatelessProps = CounterBaseProps & {
  value: number;
};

export type CounterProps = CounterBaseProps & {
  resultSet?: ResultSet;
  data?: { value: number };
};
